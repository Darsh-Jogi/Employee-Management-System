import { HRSignupPage } from "../pages/HumanResources/HRSignup"
import { HRLogin } from "../pages/HumanResources/HRlogin"
import { HRDashbaord } from "../pages/HumanResources/HRdashbaord"
import { VerifyEmailPage } from "../pages/HumanResources/verifyemailpage.jsx"
// import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
// import { ResetEmailVerification } from "../pages/HumanResources/resendemailverificaiton.jsx"
import { HRForgotPasswordPage } from "../pages/HumanResources/forgotpassword.jsx"
import { ResetMailConfirmPage } from "../pages/HumanResources/resetmailconfirm.jsx"
import { ResetHRPasswordPage } from "../pages/HumanResources/resetpassword.jsx"
import { ResetHRVerifyEmailPage } from "../pages/HumanResources/resetemail.jsx"
import { HRDashboardPage } from "../pages/HumanResources/Dashboard Childs/dashboardpage.jsx"

export const HRRoutes = [
    {
        path: "/auth/HR/signup",
        element: <HRSignupPage />
    },
    {
        path: "/auth/HR/login",
        element: <HRLogin />
    },
    {
        path: "/auth/HR/dashboard",
        element: <HRDashbaord />,
        children: [
            {
                path: "/auth/HR/dashboard/dashboard-data",
                element: <HRDashboardPage />
            }
        ]
    },
    {
        path: "/auth/HR/verify-email",
        element: <VerifyEmailPage />
    },
    {
        path: "/auth/HR/reset-email-validation",
        element: <ResetHRVerifyEmailPage />
    },
    {
        path: "/auth/HR/forgot-password",
        element: <HRForgotPasswordPage />
    },
    {
        path: "/auth/HR/reset-email-confirmation",
        element: <ResetMailConfirmPage />
    },
    {
        path: "/auth/HR/resetpassword/:token",
        element: <ResetHRPasswordPage />
    },
]