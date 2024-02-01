import { StyleSheet, Dimensions } from "react-native";

var widthScreen = Dimensions.get('window').width; //full width
var heightScreen = Dimensions.get('window').height; //full height
var buttonsHeight = 50;
var buttonsWidth = widthScreen-40;
{/**Variabili globali */}
global.linkFotoBarman = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/barman.jpg?alt=media&token=ee24c4e8-6696-4d0b-ba0a-72d3bd759337';
global.linkFotoSicurezza = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/addettoSicurezza.jpg?alt=media&token=fe8016f4-bd95-4888-920f-ddd1c52f9caf';
global.linkFotoFotografo = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/fotografo2.jpg?alt=media&token=ceae646a-21b5-409f-ab7b-5adcc8e2a847';
global.linkFotoArtista = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/artista.jpg?alt=media&token=6a1feed9-a090-4139-a11f-b84800578799';
global.linkFotoCuoco = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/cuoco.jpg?alt=media&token=34d4004c-9438-4ad9-9613-2b0dec9a0a75';
global.linkFotoPulizie = 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/pulizia.jpg?alt=media&token=b9e07ce1-6638-4bb2-9627-12337ecfcb4e';
global.tokenTest = null;
export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    LogoContainer: {
      display: 'flex',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    LoginContainer: {
      display: 'flex',
      flex: 8,
      alignItems: 'center',
      borderRadius: 40,
      backgroundColor: '#FFF',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    ButtonContainer: {
      display: 'flex',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 10,
    },
    FormContainer: {
      display: 'flex',
      flex: 8,
      alignItems: 'center',
      paddingTop: 20,
    },
    tinyLogo: {
      width: 250,
      height: 250,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#062F76',
      width: buttonsWidth,
      height: buttonsHeight,
      borderRadius: 30,
    },
    whiteText: {
      color: 'white',
    },
    error: {
      borderColor: '#ff5b4f',
      borderWidth: 1
    },
    input: {
      width: buttonsWidth,
      height: buttonsHeight,
      textAlign: 'center',
      backgroundColor: '#f7f7f7',
      borderRadius: 30,
      marginTop: 15,
      marginBottom: 15,
      padding: 15,
    },
    infoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
      width: buttonsWidth,
      borderRadius: 30,
      marginTop: 15,
      marginBottom: 15,
      paddingTop: 15,
      paddingBottom: 15,
    },
    logOut: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DA4747',
      width: '90%',
      borderRadius: 30,
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    inputCercaEvento: {
      height: 40,
      borderColor: 'gray', 
      borderWidth: 1, 
      padding: 5
    },
    forgotButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: buttonsWidth/3*2,
      height: buttonsHeight/3*2,
      borderColor: '#062F76',
      borderWidth: 1,   
      borderRadius: 30,
    },
    viewImmagineCopertina: {
      width: widthScreen,
      //height: widthScreen*2/3.2 + 10,
      height: widthScreen + 10
    },
    immagineCopertina: {
      // remove width and height to override fixed static size
      width: widthScreen,
      //height: widthScreen*2/3.2,
      height: widthScreen,
      justifyContent: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      overflow: "hidden",
      paddingTop: 10,
    },
    bottoniCopertinaEvento: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 2,
      paddingTop: '10%',
      paddingLeft: '5%',
      paddingRight: 30
    },
    titoloCopertinaEvento: {
      marginTop: -20,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 6,
    },
    dettagliCopertinaEvento: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 2,
      paddingHorizontal: 25
    },
    nomeEvento: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    condividiEvento: {
      width: 30,
      height: 30,
    },
    panoramicaEvento: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    row: {
      marginTop: 15,
      marginBottom: 15,
      flexDirection: 'row',
      width: widthScreen-50,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rigaTitoli: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: widthScreen-50,
    },
    map: {
      width: '100%',
      height: '100%',
      borderRadius: 30
    },
    mapContainer: {
      width: widthScreen-50,
      height: widthScreen*1.4,
      overflow:"hidden",
      borderRadius: 30,
    },
    immagineAccount: {
      backgroundColor: '#f7f7f7',
      borderRadius: 500,
      width: widthScreen/2,
      height: widthScreen/2
    },
    searchContainer: {
      width: widthScreen-50,
      borderRadius: 30,
    },
    selettorePiccolo: {
      width: widthScreen*3.5/10,
      alignContent: 'center',
      marginBottom: 0,
      marginTop: 0
    },
    vistaCentrata: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22
    },
    vistaCalendario: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width: '90%',
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    listItem: {
      width: 25,
      height: 25,
      marginRight: 10,
      marginLeft: 10
    },
    headerMenu:{
      marginTop: 30,
      marginBottom: 10,
      marginLeft: 20
    },
    inputCercaEvento: { 
      backgroundColor: '#F7F7F7',
      width: "80%",
      height: 50,
      borderColor: 'gray', 
      padding: 5,
      borderRadius: 50,

    },
    filtroCerca: {
      padding:10,
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
      backgroundColor: '#F7F7F7',
      height: 50,
      width: 50,
      borderRadius: 100,
      marginTop:30,
    },
    containerCercaHome: {
      padding:10,
      height:50,
      marginTop:30,
      marginLeft:10,
      marginRight:10,
      width:"80%",
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:"#F7F7F7",
      borderColor: 'gray',
      borderRadius: 50,
      paddingHorizontal: 20,
    },
    inputCercaHome: {
      flex: 1,
      height: 40,
    },
    searchIconCercaHome: {
      marginLeft: 10,
    },
    containerRaggioMappa: {
      padding: 10,
      height:50,
      marginVertical: 10,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      //backgroundColor:"#F7F7F7",
      marginRight: "15%",
      marginLeft: "15%",
      borderRadius: 40,
      width: widthScreen-50,
    },
    labelRaggioMappa: {
      fontSize: 16,
      marginBottom: 5,
      marginRight: 10,
      alignContent: "center",
    },
    inputRaggioMappa: {
      height: 40,
      borderColor: 'gray',
      borderRadius:40,
      backgroundColor:"#F7F7F7",
      paddingHorizontal: 10,
      textAlign: 'center', // Centra il testo orizzontalmente
      alignItems: 'center', // Centra il testo verticalmente
    },
    testoEventiVicini: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      marginTop: 15,
      marginBottom: 15
    },
    containerCardEventi: {
      width: widthScreen-50,
      height:widthScreen*7/10,
      marginTop:10,
      marginBottom: 10,
      marginHorizontal:10,
      flex: 1,
      borderRadius: 40,
      overflow: 'hidden',
    },
    backgroundImageCardEventi: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    contentContainerCardEventi: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Overlay nero per migliorare la leggibilità del testo
    },
    titoloCardEventi: {
      marginTop:"10%",
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    sottotitoloCardEventi: {
      marginTop:"5%",
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
    navStyle: {
      backgroundColor: 'blue',
      height: 70,
    },
    listItem: {
      width: 23,
      height: 23,
      marginRight: 10,
      marginLeft: 10
    },
    caricaDocumenti: {
      borderColor: '#062F76',
      borderWidth: 5,
      borderRadius: 30,
      borderStyle: 'dotted',
      width: widthScreen-50,
      height: (widthScreen-50)*9/16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 50,
    },
    infoPersonaliSelettore: {
      marginBottom: 10,
      marginTop: 0,
      width: '90%',
      borderBottomColor: '#e7e7e7',
      borderBottomWidth: 2
    },
    safeArea: {
      height: 50,
      backgroundColor: 'white'
    }
  });
