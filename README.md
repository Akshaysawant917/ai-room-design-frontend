# ai.home Frontend

This is the frontend for **ai.home**, an AI interior design app for Indian homes.

A user can:

1. Upload a room photo.
2. Choose the room type, budget, style, and colours.
3. Pay for an AI generation through Razorpay.
4. Wait while the backend creates the design.
5. View the result and saved transformations.

The app is built with React and Vite.

## Quick Start

### Requirements

- Node.js 18 or newer
- npm
- The ai.home backend running locally or on a server
- A Razorpay Checkout script and backend Razorpay setup for real payments

### Install

From the project folder, run:

```bash
npm install
```

### Configure the backend URL

Create a file named `.env.local` in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

The value must point to the backend API base URL. If this variable is missing, the frontend uses `http://localhost:5000/api`.

Do not put secret keys in the frontend environment file. Frontend variables are visible in the browser. Razorpay secret keys must stay on the backend.

### Run in development

```bash
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

### Other commands

```bash
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project Structure

```text
src/
  api/                         Backend API functions
    auth.js                    Login and current-user requests
    client.js                  Axios setup, auth header, and error handling
    images.js                  Image upload request
    payments.js                Razorpay order and verification requests
    transformations.js         Transformation list and detail requests
  components/
    auth/                      Login and Google auth callback screens
    common/                    Shared route protection
    history/                   Saved transformation list
    landing/                   Home page
    layout/                    Header and footer
    payment/                   Razorpay payment modal
    transformation/            Wizard, generation, result, and detail screens
  context/
    AuthContext.jsx            Login state and token handling
  hooks/
    useAuth.js                 Small hook for AuthContext
  routes/
    AppRoutes.jsx              All frontend routes and wizard navigation
  services/
    draftStorage.js            Stores the uploaded image locally in IndexedDB
  utils/
    constants.js               Room types, budgets, styles, colours, and demo images
  App.jsx                      Browser router and AuthProvider setup
  App.css                      Main application styles
  index.css                    Global styles
  main.jsx                     React entry point
```

## Main Routes

| URL | Purpose | Login required |
| --- | --- | --- |
| `/` | Landing page | No |
| `/login` | Google sign-in page | No |
| `/auth/callback?token=...` | Saves the token after Google login | No |
| `/transform/upload` | Upload a room photo | No, but login is required before payment |
| `/transform/room` | Select room type | No |
| `/transform/budget` | Select budget | No |
| `/transform/style` | Select up to two styles | No |
| `/transform/colors` | Select colour preference | No |
| `/transform/review` | Review choices and start payment | Yes when submitting |
| `/transformations` | User's saved transformations | Yes |
| `/transformations/:id` | One transformation and its status | Yes |

Unknown routes redirect to `/`.

## How the User Flow Works

### 1. The user starts a transformation

The home page sends the user to `/transform/upload`.

The wizard stores these choices in the `draft` object:

```js
{
  room: '',
  budget: '',
  style: [],
  color: '',
  file: null,
  image: null,
  imageId: '',
  imageUrl: ''
}
```

### 2. The image is uploaded

The frontend checks that the file is JPG, PNG, or WEBP and is smaller than 10 MB.

The original file is kept in IndexedDB using `src/services/draftStorage.js`. When the user reaches the review page, the file is sent to:

```text
POST /api/images/upload
```

The frontend expects the uploaded image information in the response, including an image `id` and `url`.

### 3. The payment order is created

When the user clicks **Transform my room**, the frontend does not call the transformation creation endpoint directly.

It sends the selected data to:

```text
POST /api/payments/create-order
```

Request body:

```json
{
  "transformationData": {
    "imageId": "image-id",
    "roomType": "living-room",
    "budget": "medium",
    "styles": ["modern", "cozy"],
    "colorPreference": "warm neutrals"
  }
}
```

The backend should return these Razorpay order fields:

```json
{
  "orderId": "order_xxx",
  "amount": 2900,
  "currency": "INR",
  "keyId": "rzp_test_xxx",
  "transformationId": "transformation-id"
}
```

Amounts are in paise:

- `2900` means INR 29 for the first generation.
- `7900` means INR 79 for later generations.

The frontend displays the amount as `amount / 100`. It does not decide the final price.

### 4. Razorpay Checkout opens

The Razorpay Checkout script is loaded in `index.html`:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

The modal in `src/components/payment/PaymentModal.jsx` creates Checkout using the backend order fields. Checkout opens for every generation, including the first one.

### 5. Payment is verified

After successful Checkout, the frontend sends the Razorpay response to:

```text
POST /api/payments/verify
```

Request body:

```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature"
}
```

The backend must verify the signature. The frontend then uses the returned `transformationId` (or the ID received when the order was created) to open the transformation detail page.

### 6. Generation status is shown

The detail page calls:

```text
GET /api/transformations/:id
```

It refreshes every 4 seconds while the status is `PENDING` or `PROCESSING`.

The expected status behavior is:

- `PENDING`: waiting for the generation worker.
- `PROCESSING`: the AI design is being created.
- `COMPLETED`: show the original and generated images.
- `FAILED`: show an error message.

## Pricing

The pricing rule belongs to the backend:

| Generation | Price | Razorpay amount |
| --- | ---: | ---: |
| First | INR 29 | `2900` paise |
| Every later generation | INR 79 | `7900` paise |

The frontend only displays the `amount` returned from `/payments/create-order`. It must not use `freeTransformationUsed` or skip payment based on a local flag.

## Authentication

The login flow is Google-based:

1. The login screen sends the browser to `/api/auth/google`.
2. The backend redirects back to `/auth/callback?token=...`.
3. `AuthCallback` saves the token through `AuthContext`.
4. The token is stored in `localStorage` under `ai_home_token`.
5. `api/client.js` adds the token as a Bearer token to API requests.
6. The frontend calls the current-user endpoint to load the user.

If the backend returns HTTP 401, the frontend removes the token and sends the user to `/login`.

Protected pages use `ProtectedRoute`. At the moment, the frontend allows the user to fill in the wizard before login, then sends them to login when they submit the review.

## State and Browser Storage

### `localStorage`

Used for the login token:

```text
ai_home_token
```

### `sessionStorage`

Used for the wizard draft:

```text
transformationDraft
```

The draft stores text choices and the uploaded image ID and URL. The actual `File` object and temporary object URL are not stored in session storage. The file is restored from IndexedDB when possible.

### IndexedDB

`draftStorage.js` stores the uploaded image file so a page refresh can restore the image while the browser session is still available.

## Payment and Refresh Behavior

The transformation itself is created and processed by the backend, so leaving the transformation detail page should not stop backend processing.

However, the current frontend does not persist an active Razorpay order or payment attempt. This means:

- Refreshing while Razorpay Checkout is open closes the Checkout UI.
- Navigating away while Checkout is open unmounts the payment modal.
- If payment succeeds but the browser closes before verification finishes, the frontend does not automatically resume verification.
- After payment verification has finished and the user is on `/transformations/:id`, refreshing is safe. The detail page loads the ID from the URL and continues polling.

### Recommended future improvement

Save the active `orderId` and `transformationId` in session storage. On app startup, check whether there is an unfinished payment and ask the backend for its status. This requires a backend endpoint such as:

```text
GET /api/payments/:orderId/status
```

The frontend should clear the saved payment data after successful verification or a confirmed failed/cancelled payment.

## API Error Handling

All API requests go through `src/api/client.js`.

The client:

- Adds the auth header.
- Sets JSON headers for normal requests.
- Lets the browser set multipart headers for `FormData` uploads.
- Converts backend errors into an `Error` with `message`, `code`, and `status`.
- Logs the user out on HTTP 401.

Important payment errors:

- `402 PAYMENT_REQUIRED`: show that payment is required before generation.
- `400` or `404`: show the backend's returned error message.
- Razorpay cancellation: keep the user on the review form so they can retry.
- Verification failure: show the error in the payment modal and allow retry.

## Backend Contract Summary

The frontend currently uses these backend calls:

| Method | Endpoint | Used by |
| --- | --- | --- |
| `GET` | `/auth/me` | Load the signed-in user |
| Browser redirect | `/auth/google` | Start Google login |
| `POST` | `/images/upload` | Upload the room photo |
| `POST` | `/payments/create-order` | Create a paid generation order |
| `POST` | `/payments/verify` | Verify Razorpay payment |
| `GET` | `/transformations` | Load transformation history |
| `GET` | `/transformations/:id` | Load and poll one transformation |

There should be no frontend call to `POST /transformations` for generation. Payment order creation is the start of the generation flow.

## Common Problems

### API calls use the wrong server

Check `.env.local` and confirm `VITE_API_URL` points to the backend. Restart Vite after changing environment variables.

### Razorpay does not open

Check all of these:

- The Razorpay script loads in the browser.
- `window.Razorpay` exists.
- The backend returned `keyId`, `orderId`, `amount`, and `currency`.
- The order belongs to the same Razorpay mode as the key: test or live.

### The user is sent back to login

The token may be missing, expired, or rejected by the backend. Clear the browser's `ai_home_token`, sign in again, and check the backend auth logs.

### The transformation page keeps loading

Check the backend worker and the response from `GET /transformations/:id`. The frontend only shows the completed result when the status becomes `COMPLETED` and a generated image URL is available.

### Images disappear after refresh

The temporary preview URL is recreated from the IndexedDB file. If the browser cleared site data or IndexedDB is unavailable, the preview cannot be restored. The uploaded image ID and URL should still be available in the saved draft if the upload already finished.

## Development Notes

- Keep API calls in `src/api/`; components should call API helper functions rather than Axios directly.
- Keep authentication logic in `AuthContext`.
- Keep route decisions in `AppRoutes.jsx`.
- Use the existing CSS variables and component classes in `App.css` before adding new styles.
- Do not add payment secrets to frontend code.
- Test both first-generation pricing and later-generation pricing with backend-created orders.
- Test payment success, payment cancellation, verification failure, refresh during Checkout, and refresh on the transformation detail page.
