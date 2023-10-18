import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import React from 'react'
import CustomTextInp from '../../Post/Components/CustomTextInp'
const width = Dimensions.get("screen").width
import LocationDropDown from '../../Post/Components/LocationDropDown'

const RoleOptions = ({
    Role,
    userNameValue,
    emailValue,
    addressValue,
    detailsValue,
    prevWorkValue,
    expValue,
    officeNameValue,
    firmNameValue,
    realEstateNameValue,
    areaValue,
    designationValue,
    onChangeText,
    openLocationDropdown,
    location,
}) => {
    console.log("Role in RoleOptions:", Role)
    return (
        <View style={styles.mainContainer}>
            {Role == "buyer_seller" &&
                <>

                    {/* User Name */}
                    <CustomTextInp
                        value={userNameValue}
                        titleEN={"User Name "}
                        onChangeText={(txt) => onChangeText(txt, "user_name")}
                    />

                    {/* Email */}
                    <CustomTextInp
                        value={emailValue}
                        titleEN={"Email "}
                        onChangeText={(txt) => onChangeText(txt, "email")}
                    />

                    {/* Previous Work */}
                    <CustomTextInp
                        value={prevWorkValue}
                        titleEN={"Previous Work "}
                        onChangeText={(txt) => onChangeText(txt, "prevWork")}
                    />

                    {/* Experience */}
                    <CustomTextInp
                        value={expValue}
                        titleEN={"Experience "}
                        onChangeText={(txt) => onChangeText(txt, "exp")}
                    />

                    {/* Office Name */}
                    <CustomTextInp
                        value={officeNameValue}
                        titleEN={"Office Name "}
                        onChangeText={(txt) => onChangeText(txt, "office_name")}
                    />

                    {/* Address */}
                    <CustomTextInp
                        value={addressValue}
                        titleEN={"Address "}
                        onChangeText={(txt) => onChangeText(txt, "address")}
                    />

                    {/* Description */}
                    <CustomTextInp
                        value={detailsValue}
                        titleEN={"Description "}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={(txt) => onChangeText(txt, "desc")}
                    />

                    {/* Area */}
                    <LocationDropDown
                        titleMain={"Area"}
                        showModal={openLocationDropdown}
                        title={location?.location == "Null" ? "Area" : location?.valueToShow}
                    />
                </>
            }

            {Role == "builder" &&
                <>

                    {/* User Name */}
                    <CustomTextInp
                        value={userNameValue}
                        titleEN={"User Name "}
                        onChangeText={(txt) => onChangeText(txt, "user_name")}
                    />

                    {/* Email */}
                    <CustomTextInp
                        value={emailValue}
                        titleEN={"Email "}
                        onChangeText={(txt) => onChangeText(txt, "email")}
                    />

                    {/* Firm Name */}
                    <CustomTextInp
                        value={firmNameValue}
                        titleEN={"Firm Name "}
                        onChangeText={(txt) => onChangeText(txt, "firm_name")}
                    />

                    {/* Address */}
                    <CustomTextInp
                        value={addressValue}
                        titleEN={"Address "}
                        onChangeText={(txt) => onChangeText(txt, "address")}
                    />

                    {/* Description */}
                    <CustomTextInp
                        value={detailsValue}
                        titleEN={"Description "}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={(txt) => onChangeText(txt, "desc")}
                    />

                    {/* Designation */}
                    <CustomTextInp
                        value={designationValue}
                        titleEN={"Designation "}
                        onChangeText={(txt) => onChangeText(txt, "designation")}
                    />


                </>
            }
            {Role == "estate_agent" &&
                <>

                    {/* User Name */}
                    <CustomTextInp
                        value={userNameValue}
                        titleEN={"User Name "}
                        onChangeText={(txt) => onChangeText(txt, "user_name")}
                    />

                    {/* Email */}
                    <CustomTextInp
                        value={emailValue}
                        titleEN={"Email "}
                        onChangeText={(txt) => onChangeText(txt, "email")}
                    />

                      {/* Real Estate Name */}
                      <CustomTextInp
                        value={realEstateNameValue}
                        titleEN={"Real Estate Name "}
                        onChangeText={(txt) => onChangeText(txt, "real_estate_name")}
                    />

                    {/* Address */}
                    <CustomTextInp
                        value={addressValue}
                        titleEN={"Address "}
                        onChangeText={(txt) => onChangeText(txt, "address")}
                    />

                    {/* Description */}
                    <CustomTextInp
                        // value={detailsValue}
                        titleEN={"Description "}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={(txt) => onChangeText(txt, "desc")}
                    />

                    {/* Designation */}
                    <CustomTextInp
                        value={designationValue}
                        titleEN={"Designation "}
                        onChangeText={(txt) => onChangeText(txt, "designation")}
                    />


                </>
            }

        </View>
    )
}

export default RoleOptions

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        alignItems: "flex-start",
        marginTop: 30,
        paddingLeft: 15,
    },
})