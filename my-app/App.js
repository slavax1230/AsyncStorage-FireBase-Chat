import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function App() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [firstName,setFirstName] = useState('');
const [LastName,setLastName] = useState('');

const users = [
  {
    email:'elihuc@elihuc.com',
    password:'123456',
    fname:'elihuc',
    lname:'chitrit',
    position: 'CTO'
  },
  {
    email:'slava@elihuc.com',
    password:'111111',
    fname:'slava',
    lname:'saifer',
    position: 'Worker'
  },
  {
    email:'bbbbb@elihuc.com',
    password:'123456',
    fname:'avi',
    lname:'arbov',
    position: 'IT'
  },
  {
    email:'aaaaa@elihuc.com',
    password:'45454',
    fname:'dor',
    lname:'azulay',
    position: 'Backend Developer'
  }
];


  const loadDataFromAsyncStorage = useCallback(async () => {
    try { // .GETITEM זאת פונקציה מתוך רבים שאפשר לבחור ב מתוך אסינג סטורדז
      const data = await AsyncStorage.getItem('myAccount'); // myaccount משתנה שאני בוחר איך לקרוא לו 
      if (data !== null){
        const formatttedData = JSON.parse(data)
        setFirstName(formatttedData.fname)
        setLastName(formatttedData.lname)
      } else {
        console.log("there is no data exist")
      }
    } catch (error) {
      console.log(error.message);
    }
  },[setFirstName,setLastName])

  useEffect(() => {
    loadDataFromAsyncStorage(); // קריאה לפונקציה שיצרנו למעלה בעזרת יוז אפפקט - חד פעמי

  },[loadDataFromAsyncStorage()])// אם לשים את הפונקציה בתוך המערך פה הוא יביא את זה ללא סוף


  const login = async() => {
    const account = users.find(x => x.email == email); // פונה למסד נתונים שיצרנו ומחפש פריט איקס בשדה אימיל שווה ל
    if (account){
      if (password == account.password){
        console.log('Ok');
        
        AsyncStorage.setItem('myAccount', JSON.stringify({
          fname: account.fname,
          lname: account.lname,
          accountEmail:account.email,
          Position:account.position
        }));

      }else{
        console.log('password not match');
      }
    }else{
      console.log('User not Found');
    }
  }
  const logout = async() => {
    AsyncStorage.removeItem('myAccount')
  }


  return (  
    <View style={styles.container}>
      
    {
      firstName != '' ? 
      (
        <View style={{width:"100%"}}><Text>Hello {firstName} {LastName}</Text>
        <TouchableOpacity onPress={logout}
      style={{width:'100%',paddingVertical:15,backgroundColor:'#0099cc',alignItems: 'center',borderRadius:20,marginTop:12}}>
          
      <Text>Logout</Text>
     </TouchableOpacity>
        </View>
      ) 
      : 
      (
        <View style={{width:"100%"}}>
        <TextInput
     value={email}
     onChangeText= {text => setEmail(text)}
     style={styles.input}
     placeholder='Email' // יכתוב מה צריך להכניס
     keyboardType='email-address' // ידגיש ללקוח שזה אימייל וצריך שטרודל
     autoCapitalize='none' // אות ראשונה גדולה או לא צריך 

     />
     
     <TextInput
     value={password} //  משפיע על השדה של הסיסמא
     onChangeText= {text => setPassword(text)} // לוקח מה שיש בשדה ומכניס לתוך המשתנה שלנו ביוז סטאט
     style={styles.input}
     placeholder='Password' // יכתוב מה צריך להכניס
     keyboardType='default' // רגיל
     autoCapitalize='none' // אות ראשונה גדולה או לא צריך 
     secureTextEntry={true} // לא יאפשר להראות את הסיסמא לכולם

     />
     <TouchableOpacity onPress={login}
      style={{width:'100%',paddingVertical:15,backgroundColor:'#0099cc',alignItems: 'center',borderRadius:20,marginTop:12}}>

      <Text>Login</Text>
     </TouchableOpacity>
     
     </View>

      )
    }


     

     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    padding:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{width:'100%',paddingVertical:15,paddingHorizontal:10,backgroundColor:'#ffffff',borderColor:'#cccccc',borderWidth:0.6,borderRadius:12,marginTop:2}
});
