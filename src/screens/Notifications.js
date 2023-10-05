import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { DummyData } from '../components/DummyData'
import NotificationCard from '../components/NotificationCard'
import { getNotifications } from '../redux1/APIs'
const { width, height } = Dimensions.get("window")


const Notifications = () => {
  const navigation = useNavigation();
  const [notificationdata, setnotificationdata] = useState('')
const get=async()=>{
 const data = await getNotifications()
setnotificationdata(data?.Notification)
}

useEffect(() => {
  const focusListner = navigation.addListener('focus', async () => {
    get();
  });
  return focusListner;
}, []);
  useEffect(() => {
    get()
  }, [])
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={25} color='#000' />
        </TouchableOpacity>
        <Text style={{ color: '#000', marginLeft: 20, fontSize: 21, fontWeight: 'bold' }}>Notifications</Text>
      </View>
      <FlatList
        data={notificationdata}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={()=>
        <View style={{alignContent:'center', marginVertical:50}}>
          <Text style={{color:'black', textAlign:'center'}}>No Notification Found</Text>
          </View>}
        renderItem={({ item }) =>
          <NotificationCard
            // name={item?.}
            // des={item?.description}
            tim={item?.createdAt}
            img={item?.receiver_image}
          name={item?.title}
          des={item?.body}
          
          />
        }
      />
    </View>
  )
}

export default Notifications