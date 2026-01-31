// import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Toaster } from '@/components/ui/sonner'
import appCss from '../styles.css?url'
// import { getAuthFn } from '@/feature/auth/services/auth.functions'
import NotFound from '@/components/web/NotFound'
import { TanstackQueryProvider } from '@/providers/query-provider'
// import { ThemeProvider } from '@/lib/theme-provider'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Pop Water',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  // beforeLoad: async () => {
  //   const auth = await getAuthFn()
  //   return { user: auth.user, role: auth.role, isAuthed: auth.isAuthed }
  // },

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <TanstackQueryProvider>
          {/* <ThemeProvider> */}
          <main>{children}</main>
          <Toaster position="top-right" />
          {/* </ThemeProvider> */}
        </TanstackQueryProvider>
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
