import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyD9uJSx87wLWMehUFmpdboN9sBM9s_tN1M",
  authDomain: "insan-cemerlang-41b6b.firebaseapp.com",
  projectId: "insan-cemerlang-41b6b",
  storageBucket: "insan-cemerlang-41b6b.appspot.com",
  messagingSenderId: "1057804782651",
  appId: "1:1057804782651:web:bf911a5c4bff4f7bef201e"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpn: dok.data().notlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      tanggal:tanggal,
      nis:nis,
      nama:nama,
      alamat:alamat,
      notlpn:notlpn,
      kelas:kelas,
      keterangan:keterangan,
    });
    console.log('Berhasil menambah absensi' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah absensi' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahAbsensi(docId, tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
  await updateDoc(doc(db, "absensi", docId), {
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan,
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}