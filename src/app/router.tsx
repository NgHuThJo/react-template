import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuthContextApi } from "#frontend/providers/auth-context";
import { AppRoot } from "./root.js";
import { chatAction } from "#frontend/features/chat/components/form/form";
import { chatLoader, ChatRoute } from "./routes/chat.js";
import { ErrorRoute } from "./routes/error.js";
import { FeedRoute, feedAction, feedLoader } from "./routes/feed.js";
import { FriendRoute, friendLoader } from "./routes/friend.js";
import { IndexRoute, indexLoader } from "./routes/index.js";
import { LandingRoute } from "./routes/landing.js";
import { LoginRoute } from "./routes/login.js";
import { loginAction } from "#frontend/features/auth/components/login/form";
import { NotFoundRoute } from "./routes/not-found.js";
import { PostRoute, postLoader, postAction } from "./routes/post.js";
import { PublicProfileRoute } from "./routes/public-profile.js";
import { ProfileRoute, profileLoader } from "./routes/profile.js";
import { ProtectedRoute } from "./routes/protected.js";
import { RegisterRoute } from "./routes/register.js";
import { registerAction } from "#frontend/features/auth/components/register/form/form";
import { SettingsRoute } from "./routes/settings.js";
import { settingsAction } from "#frontend/features/settings/components/settings";

export function Router() {
  const authContextApi = useAuthContextApi();

  const routesConfig = [
    {
      errorElement: <ErrorRoute />,
      children: [
        {
          path: "/",
          element: <LandingRoute />,
        },
        {
          path: "/auth/register",
          element: <RegisterRoute />,
          action: registerAction,
        },
        {
          path: "/auth/login",
          element: <LoginRoute />,
          action: loginAction(authContextApi),
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: ":userId",
              element: <AppRoot />,
              children: [
                {
                  path: "index",
                  element: <IndexRoute />,
                  loader: indexLoader,
                },
                {
                  path: "profile",
                  element: <ProfileRoute />,
                  loader: profileLoader,
                },
                {
                  path: "friends",
                  element: <FriendRoute />,
                  loader: friendLoader,
                },
                {
                  path: "posts",
                  element: <PostRoute />,
                  loader: postLoader,
                  action: postAction,
                },
                {
                  path: "feeds",
                  element: <FeedRoute />,
                  loader: feedLoader,
                  action: feedAction,
                },
                {
                  path: "chat",
                  element: <ChatRoute />,
                  loader: chatLoader,
                  action: chatAction,
                },
                {
                  path: "settings",
                  element: <SettingsRoute />,
                  action: settingsAction(authContextApi),
                },
                {
                  path: "profile/:profileId",
                  element: <PublicProfileRoute />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundRoute />,
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
