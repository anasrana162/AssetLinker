import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {getUserDetails} from '../redux1/APIs';

const Profile = ({route}) => {
  const id = route.params;
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  const [userAvailable, setUserAvailable] = useState();

  const get = async () => {
    const data = await getUserDetails(id);
    console.log(data, '====================================');

    setUserAvailable(data);
  };
  useEffect(() => {
    get();
  }, []);
  console.log(userAvailable);
  console.log('====================================');
  return (
    <View style={{flex: 1}}>
      <View style={{}}>
        <View
          style={{
            backgroundColor: '#023661',
            margin: 10,
            height: 180,
            borderRadius: 20,
          }}></View>
        <View style={styles.img}>
          <Image
            source={
              userAvailable?.image
                ? {uri: `http://173.249.10.7:8066/${userAvailable?.image}`}
                : require('../../assets/profile.jpg')
            }
            style={{height: 100, width: 100, borderRadius: 100}}
          />
          <Text style={{fontSize: 19, color: 'black', fontWeight: 'bold'}}>
            {userAvailable?.userName}
          </Text>
          <Text style={{fontSize: 19, color: 'black'}}>
            {userAvailable?.email}
          </Text>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{}}>
          <View style={{marginHorizontal: 50, marginBottom: 30}}>
            <Text style={styles.text}> Name </Text>
            <TextInput
              placeholder={' name'}
              style={styles.input}
              value={userAvailable?.userName}
            />
            {userAvailable?.role == 'seller' ? null : (
              <>
                {userAvailable?.previousWork == 'undefined' ||
                userAvailable?.previousWork == undefined ? null : (
                  <>
                    <Text style={styles.text}> Previous work </Text>
                    <TextInput
                      placeholder={'  Previous work'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      value={userAvailable?.previousWork}
                    />
                  </>
                )}
                {userAvailable?.stateName == 'undefined' ||
                userAvailable?.stateName == undefined ||
                userAvailable?.stateName == null ||
                userAvailable?.stateName == 'null' ? null : (
                  <>
                    <Text style={styles.text}> State Name </Text>
                    <TextInput
                      placeholder={'State Name'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      value={userAvailable?.stateName}
                    />
                  </>
                )}
                {userAvailable?.firmName == 'undefined' ||
                userAvailable?.firmName == undefined ||
                userAvailable?.firmName == null ||
                userAvailable?.firmName == 'null' ? null : (
                  <>
                    <Text style={styles.text}> FirmName </Text>
                    <TextInput
                      placeholder={' FirmName'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      value={userAvailable?.firmName}
                    />
                  </>
                )}
                {userAvailable?.experience == 'undefined' ||
                userAvailable?.experience == undefined ? null : (
                  <>
                    <Text style={styles.text}> Experience </Text>
                    <TextInput
                      placeholder={'  Experience'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      value={userAvailable?.experience}
                    />
                  </>
                )}
                {userAvailable?.experience == 'undefined' ||
                userAvailable?.experience == undefined ? null : (
                  <>
                    <Text style={styles.text}> Office </Text>
                    <TextInput
                      placeholder={'Office'}
                      style={styles.input}
                      value={userAvailable?.officeName}
                    />
                  </>
                )}
              </>
            )}
            {userAvailable?.location == 'undefined' ||
            userAvailable?.location == undefined ? null : (
              <>
                <Text style={styles.text}> Address </Text>
                <TextInput
                  value={userAvailable?.location}
                  placeholder={'Address'}
                  style={styles.input}
                  keyboardType={'numeric'}
                />
              </>
            )}
            {userAvailable?.description == 'undefined' ||
            userAvailable?.description == undefined ? null : (
              <>
                <Text style={styles.text}> Detail</Text>
                <TextInput
                  value={userAvailable?.description}
                  placeholder={'details'}
                  style={styles.inputarea}
                  multiline={true}
                />
              </>
            )}
            {/* <Text style={styles.text}  > About  </Text>
                        <TextInput placeholder={'    About'} style={styles.inputarea} multiline={true} /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  img: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 60,
    marginRight: 60,
    marginTop: -100,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#023661',
  },
  Text: {
    margin: 20,
    marginTop: 45,
  },
  input: {
    borderWidth: 1,
    width: 290,
    height: 40,
    marginTop: 15,
    borderColor: 'black',
    paddingHorizontal: 10,
    color:"black",
  },
  inputarea: {
    borderWidth: 1,
    width: 290,
    height: 100,
    marginTop: 15,
    borderColor: 'black',
    paddingHorizontal: 10,
  },

  TouchableOpacity: {
    height: 50,
    width: 100,
    backgroundColor: '#023661',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
