import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import WebView from "react-native-webview"
import { RootStackParamList } from "../routes"
import { useNavigation } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { WebViewContext } from "../components/WebViewProvider"

const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: 'black' },
})

const LOGIN_URL = "https://nid.naver.com/nidlogin.login"

type Props = NativeStackNavigationProp<RootStackParamList>


const LoginScreen = () => {
    const navigation = useNavigation<Props>()
    const context = useContext(WebViewContext)

    useEffect(()=> {
        console.log(context?.webViewRefs.current)
    }, [context])


    return (
        <SafeAreaView style={ styles.safearea }>
            <WebView source={{ uri : LOGIN_URL }} 
            onNavigationStateChange={event => {
               if (event.url === "https://www.naver.com/") {

                if(context?.webViewRefs.current != null) {
                    context.webViewRefs.current.forEach(webView => {
                        webView.reload()
                    })
                }
                navigation.goBack()
               }
            }}/>
        </SafeAreaView>
    )
}

export default LoginScreen