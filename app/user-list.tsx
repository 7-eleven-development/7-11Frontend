// import { useContext, useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { UserContext } from "@/context/userContext";

// interface User {
//     firstName: string;
//     surname: string;
//     email: string;
//     phone: string;
// }

// // Här skapar vi en array med några användare som exempel
// const users: User[] = [
//     {
//         firstName: "Alex",
//         surname: "Raunert",
//         email: "alex@gmail.com",
//         phone: "0701234567",
//     },
//     {
//         firstName: "Teodora",
//         surname: "Kricka",
//         email: "teo@gmail.com",
//         phone: "0707654321",
//     },
// ];

// export default function UserList() {
//     const { theme } = useContext(UserContext); 
//     const [editUser, setEditUser] = useState<User | null>(null);  // Håller koll på om vi är i redigeringsläge

//     // Funktion för att hantera ändringar i användardatan
//     const handleChange = (value: string, field: keyof User) => {
//       if (editUser) {
//           setEditUser({
//               ...editUser,
//               [field]: value,
//           });
//       }
//   };
//     // Funktion för att starta redigeringen av en viss användare
//     const handleEdit = (user: User) => {
//         setEditUser(user);
//     };

//     // Funktion för att kunna spara ändringarna
//     const handleSave = () => {
//         console.log("User saved:", editUser);
//         setEditUser(null);  // Avsluta redigeringsläge
//     };

//     return (
//         <View style={[styles.container, { backgroundColor: theme === "dark" ? "#333" : "#fff" }]}>
//             <Text style={styles.title}>Användare</Text>
//             {users.map((user, index) => (
//                 <View key={index} style={styles.userCard}>
//                     {editUser?.email === user.email ? (
//                         <View style={styles.editMode}>
//                             <Text>Förnamn:</Text>
//                             <TextInput
//                               style={styles.input}
//                               value={editUser.firstName}
//                               onChangeText={(text) => handleChange(text, "firstName")}
//                           />  
//                             <Text>Efternamn:</Text>
//                             <TextInput
//                               style={styles.input}
//                               value={editUser.surname}
//                               onChangeText={(text) => handleChange(text, "surname")}
//                           />  
//                             <Text>Email:</Text>
//                               <TextInput
//                               style={styles.input}
//                               value={editUser.email}
//                               onChangeText={(text) => handleChange(text, "email")}
//                           />
//                               <Text>Telefon:</Text>
//                                 <TextInput
//                                 style={styles.input}
//                                 value={editUser.phone}
//                                 onChangeText={(text) => handleChange(text, "phone")}
//                             />
//                             <Button title="Spara" onPress={handleSave} />
//                         </View>
//                     ) : (
//                         <View style={styles.viewMode}>
//                             <Text><Text style={styles.bold}>Namn:</Text> {user.firstName} {user.surname}</Text>
//                             <Text><Text style={styles.bold}>Email:</Text> {user.email}</Text>
//                             <Text><Text style={styles.bold}>Telefon:</Text> {user.phone}</Text>
//                             <Button title="Gå till profil" onPress={() => handleEdit(user)} />
//                         </View>
//                     )}
//                 </View>
//             ))}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     userCard: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         padding: 15,
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     viewMode: {
//         marginBottom: 15,
//     },
//     editMode: {
//         marginBottom: 15,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//         marginVertical: 10,
//         borderRadius: 5,
//     },
//     bold: {
//         fontWeight: "bold",
//     },
// });
