import { ChakraProvider } from "@chakra-ui/react"
import { UserSettings } from './contexts/UserSettingContext'
import { AuthProvider } from "./contexts/FirebaseContext"
import Layout from 'components/Layout'
import 'styles/global.css'

function App() {
    return (
        <AuthProvider>
            <UserSettings>
                <ChakraProvider>
                    <Layout />
                </ChakraProvider>
            </UserSettings>
        </AuthProvider>

    );
}

export default App;
