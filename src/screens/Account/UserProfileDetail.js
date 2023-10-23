import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  NativeModules,
} from "react-native";
import React, { useEffect, useState } from "react";
import AssetLinkers, { ImagePath } from "../../api/AssetLinkers";
import { Colors } from "../../config";
import moment from "moment";
import { ScrollView } from "react-native";
import LoadingModal from "../../components/LoadingModal";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const UserProfileDetail = ({ route }) => {
  const [profile, setProfile] = useState();
  const detail = profile?.detail[0];
  const id = route?.params?.user_id;
  const memberSince = moment(profile?.created_at).format("YYYY/MM/DD");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await AssetLinkers.get(`/allUser/${id}`);

        setProfile(res?.data?.response[0]);
      } catch (error) {
        console.log("GET User Profile Error: ", error);
      }
    };
    getProfile();
  }, []);

  console.log(profile, "***********************");
  return (
    <View style={styles.mainContainer}>
      {profile ? (
        <>
          {/* Banner */}
          <View style={styles.banner}>
            <Image
              source={{ uri: `${ImagePath}/${profile?.image}` }}
              style={styles.img}
            />
            <View style={{ marginTop: 40 }}>
              <Text style={styles.name}>
                {profile?.name}{" "}
                <Text style={styles.memberSince}>{detail?.designation}</Text>
              </Text>
              <Text style={styles.memberSince}>
                Member Since: {memberSince}
              </Text>
            </View>
          </View>

          {/* Details */}
          <ScrollView contentContainerStyle={{ paddingTop: 70 }}>
            <TextBox
              title="User Type"
              label={
                profile?.user_type === "estate_agent"
                  ? "Consultant"
                  : profile?.user_type
              }
            />
            <TextBox title="MS ID" label={profile?.ms_id} />
            <TextBox title="Phone" label={profile?.phone} />
            <TextBox title="Email" label={profile?.email} />
            <TextBox title="Address" label={detail?.address} />
            <TextBox title="Location" label={detail?.location} />
            <TextBox title="About Us" label={detail?.description} />
            {/* <TextBox
              title="About Us"
              label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus quam sed nibh suscipit, quis vulputate tellus tempor. Nullam gravida diam massa, ac viverra odio rutrum id. Maecenas et fermentum urna, sed maximus lacus. Pellentesque ornare massa nisi, a rhoncus magna luctus vitae. Praesent enim elit, dignissim eu nisl eget, suscipit placerat tellus. Etiam non dui eget nunc blandit tempor rhoncus ut metus. Fusce efficitur orci suscipit ullamcorper ultricies."
            /> */}
          </ScrollView>
        </>
      ) : (
        <LoadingModal />
      )}
    </View>
  );
};

export default UserProfileDetail;

const TextBox = ({ label, title }) => (
  <>
    <Text style={styles.textBoxTitle}>{title}</Text>
    <View style={styles.textBox}>
      <Text style={styles.boxText}>{label}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: Colors.white,
  },
  banner: {
    zIndex: 1,
    backgroundColor: Colors.blue,
    height: "13%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    columnGap: 20,
    borderBottomLeftRadius: 45,
  },
  img: {
    height: 110,
    width: 110,
    borderRadius: 99,
    borderColor: Colors.white,
    borderWidth: 5,
    marginTop: 60,
  },
  name: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "600",
  },
  memberSince: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "300",
  },
  textBox: {
    width: "92%",
    borderColor: "#0007",
    borderWidth: 0.5,
    paddingHorizontal: 15,
    borderRadius: 7,
    paddingVertical: 10,
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
  },
  textBoxTitle: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 3,
    marginLeft: 28,
  },
  boxText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "300",
    textAlign: "justify",
  },
});
