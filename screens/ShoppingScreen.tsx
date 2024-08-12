
import { RefreshControl, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView} from "react-native"
import WebView from "react-native-webview"
import RouteNames, {RootStackParamList} from "../routes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useCallback, useContext, useRef, useState } from "react"
import { WebViewContext } from "../components/WebViewProvider"




type Props = NativeStackScreenProps<RootStackParamList>


const styles = StyleSheet.create({
    safearea: { flex: 1 },
    contentContainerStyle: { flex : 1}
})

const SHOPPING_HOME_URL =  "https://shopping.naver.com/home"


const Shoppingscreen = ( { navigation }: Props) => {
        const context = useContext(WebViewContext)
        const webViewRef = useRef<WebView | null>(null);
        const [refreshing, setRefreshing] = useState(false);
        
        const onRefresh = useCallback(() => {
          setRefreshing(true)
          webViewRef.current?.reload()
        }, [])

    return <SafeAreaView style={styles.safearea}>
        <ScrollView 
        contentContainerStyle={ styles.contentContainerStyle }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
        <WebView 
        ref={(ref) => {
            webViewRef.current = ref
                if(ref != null) {
                    context?.addWebView(ref)
                }
        }}
        source={{uri: SHOPPING_HOME_URL}} 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
            console.log(request)
            if (
                request.url.startsWith(SHOPPING_HOME_URL ) ||
                request.mainDocumentURL?.startsWith( SHOPPING_HOME_URL )
            ) {
                return true
            }

            if (request.url != null && request.url.startsWith('https://')) {
                navigation.navigate(RouteNames.BROWSER, {initialUrl: request.url})
                return false
            }
            return true

        }}
        onLoad={() => { 
            setRefreshing(false)
        }}
        renderLoading={()=> <></>}
        startInLoadingState={true}
        />
        </ScrollView>
    </SafeAreaView>
}

export default Shoppingscreen