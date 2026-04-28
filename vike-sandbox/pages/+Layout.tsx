// https://vike.dev/Layout

import '@mantine/core/styles.css'
import logoUrl from '../assets/logo.svg'
import type { MantineThemeOverride } from '@mantine/core'
import { AppShell, Burger, createTheme, Group, Image, MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from '../components/Link'

const theme: MantineThemeOverride = createTheme({
    /** Put your mantine theme override here */
    primaryColor: 'violet',
})

export default function Layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure()
    return (
            <MantineProvider theme={theme} defaultColorScheme="light">
                <AppShell
                        header={{ height: 60 }}
                        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                        padding="md"
                >
                    <AppShell.Main> {children} </AppShell.Main>
                </AppShell>
            </MantineProvider>
    )
}
