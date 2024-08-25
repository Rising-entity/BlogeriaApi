const multer = require('multer');
const path = require("path");


const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes ,getDownloadURL } = require("firebase/storage");


//API KEYS FORM FIREBASE(.env) **

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,

};


const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);


// UPLOAD IMG TO FIREBASE CODE
const uploadToFirebase = async (file, fileName) => {

  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;

};


const upload = multer({ storage: multer.memoryStorage() });


// UPLOAD IMG TO FIREBASE CONTROLLER HANDLER CODE
exports.UploadImgToFirebaseHandler = async (req, res) => {
    try {
       
     const originalFileName = req.file.originalname;
  
      const fileExtension = path.extname(originalFileName);
  
      const timestamp = Date.now();
  
      const fileName = `${path.parse(originalFileName).name}_${timestamp}.png`;
  
  
      const imageUrl = await uploadToFirebase(req.file, fileName);
  
  
      if (imageUrl) {
  
        res.status(200).json({ message: "Image has been uploaded to Firebase successfully", imageUrl });
  
      } else {
  
        res.status(500).json("Error getting image URL from Firebase");
      }
        

    }
    catch (err){

      console.error(err);
      res.status(500).json("Error uploading image to Firebase");
        
    }
}