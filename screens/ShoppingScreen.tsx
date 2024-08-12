//라우터
import RouteNames from "../routes"
import {RootStackParamList} from "../routes"
// 리액트네이티브 라이브러리
import { Text, TouchableOpacity, View } from "react-native"
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"



type Props = NativeStackScreenProps<RootStackParamList>

const ShoppingScreen = ({ navigation}: Props ) => {
    return ( 
    <View> 
     <Text>Shopping</Text>
     <TouchableOpacity 
        onPress={() => {
            navigation.navigate(RouteNames.BROWSER, {initialUrl: 'https://m.naver.com'})
        }}>
        <Text>Go To Browser</Text>
     </TouchableOpacity>
     <MaterialCommunityIcons name="shopping" size={50} color={"red"}/>
    </View>
)
}

export default ShoppingScreen