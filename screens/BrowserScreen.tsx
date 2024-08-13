import { SafeAreaView, StyleSheet, View, Text, Animated, TouchableOpacity, Share } from "react-native"
import WebView from "react-native-webview"
import {RootStackParamList} from "../routes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useContext, useMemo, useRef, useState } from "react"
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { WebViewContext } from "../components/WebViewProvider"
import { useBackHandler } from "@react-native-community/hooks"



type Props = NativeStackScreenProps<RootStackParamList, 'browser' >

const styles = StyleSheet.create({
    safearea: {flex: 1, backgroundColor: 'black'},
    urlContainer: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    urlText: {
        color: 'white'
    },
    loadingBarBackground: {
        height: 3,
        backgroundColor: 'white'
    },
    loadingBar: {
        height: '100%',
        backgroundColor: 'green'
    },
    navigator: {
        backgroundColor: 'black',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between'
    },
    button: {
        width: 30,
        height: 30,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    naverIconOutLine: {
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    naverIconText: {
        color: 'white'
    }

})
 
//웹뷰 핀치 줌인 줌 아웃 기능막아놓기
const DISABLE_PINCH_ZOOM = `(function() {
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);

    document.body.style.['touch-action'] = 'none';
    document.body.style.['user-select'] = 'none';
    document.body.style.['-webkit-user-select'] = 'none';

})();`;



const NavButton = ({iconName, disabled, onPress}: {
    iconName: string;
    disabled?: boolean;
    onPress?: () => void
}) => {
    const color = disabled ? 'gray' : 'white';
    return (
        <TouchableOpacity 
        style={styles.button}
        disabled={disabled}
        onPress={onPress}>
            <MaterialCommunityIcons name={iconName} color={color} size={24}/>
        </TouchableOpacity>
    )
}

const BrowserScreen = ({route, navigation}: Props) => {
    const context = useContext(WebViewContext)
    const {initialUrl} = route.params;
    const [url, setUrl] = useState(initialUrl)
    const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url])

    const progerssAnim = useRef(new Animated.Value(0)).current

    const webviewRef = useRef<WebView | null>(null);
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForword] = useState(false)


    //android default menu backbutton custom
    useBackHandler(()=> {
        if (canGoBack) {
            webviewRef.current?.goBack()
            return true // default
        }
        return false
    })


    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.urlContainer}>
                <Text style={styles.urlText}>{urlTitle}</Text>
            </View>
            <View style={styles.loadingBarBackground}>
                <Animated.View style={[styles.loadingBar, {width: progerssAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                })}]}/>
            </View>
            <WebView 
                ref={(ref)=> {
                    webviewRef.current = ref
                    if(ref != null){
                        context?.addWebView(ref)
                    }
                }}
                source={{uri: initialUrl}}
                onNavigationStateChange={(event) => {
                    setCanGoBack(event.canGoBack)
                    setCanGoForword(event.canGoForward)
                  setUrl(event.url)
                }}
                onLoadProgress={(event) => {
                    progerssAnim.setValue(event.nativeEvent.progress)
                }}
                onLoadEnd={() => {
                    progerssAnim.setValue(0)
                }}
                injectedJavaScript={DISABLE_PINCH_ZOOM}
                onMessage={() => {}}
                allowsLinkPreview={false}
                />



                <View style={styles.navigator}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.goBack();
                    }}>
                        <View style={styles.naverIconOutLine}>
                            <Text style={styles.naverIconText}>N</Text>
                        </View>
                    </TouchableOpacity>
                    <NavButton 
                    iconName="arrow-left" 
                    disabled={!canGoBack}
                    onPress={() => {
                        webviewRef.current?.goBack()
                    }}/>
                    <NavButton 
                    iconName="arrow-right"
                    disabled={!canGoForward}
                    onPress={() => {
                        webviewRef.current?.goForward()
                    }}
                    />
                    <NavButton 
                    iconName="refresh" 
                    onPress={()=> {
                        webviewRef.current?.reload()
                    }}/>
                       <NavButton 
                       iconName="share-outline" 
                       onPress={()=> {
                        Share.share({ message: url })
                    }}/>
                </View>
    </SafeAreaView>
        )
}

export default BrowserScreen