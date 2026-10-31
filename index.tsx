import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Clock, CheckCircle, AlertTriangle, Flag, ChevronLeft, ChevronRight,
  User, ShieldCheck, Download, Printer, RefreshCw, LogIn, LogOut, Settings,
  BarChart2, Award, ListCheck, HelpCircle, Eye, EyeOff, Save, Trash2, Plus, Edit3,
  Search, CheckCircle2, XCircle, FileSpreadsheet, Sparkles, Activity, Layers, Dna, Leaf, Bug
} from 'lucide-react';

// ==========================================
// INITIAL QUESTION BANK (30 Questions)
// 15 Ecosystem + 15 Virus (Fase E Class X)
// Difficulty: 30% Easy (9), 50% Medium (15), 20% Hard (6)
// ==========================================
const INITIAL_QUESTIONS = [
  // ------------------ EKOSISTEM (15 Soal) ------------------
  {
    id: 1,
    topic: "Ekosistem",
    subtopic: "Komponen Ekosistem",
    difficulty: "Mudah",
    question: "Manakah di bawah ini yang seluruhnya terdiri dari komponen abiotik dalam suatu ekosistem hutan mangrove di Maluku Tengah?",
    stimulus: "Komponen ekosistem terbagi menjadi biotik (hidup) dan abiotik (tak hidup) yang saling berinteraksi membangung kesatuan fungsional.",
    options: [
      "A. Cahaya matahari, kadar garam (salinitas), air, dan tanah lumpur",
      "B. Kepiting bakau, air laut, akar napas, dan suhu",
      "C. Serasah daun, mikroba pengurai, oksigen terlarut, dan ikan gelodok",
      "D. Ikan gelodok, eceng gondok, derajat keasaman (pH), dan kelembapan",
      "E. Plankton, kadar garam, intensitas cahaya, dan kerang"
    ],
    answer: 0,
    explanation: "Komponen abiotik merupakan benda tak hidup seperti cahaya matahari, salinitas, air, dan tanah/substrat."
  },
  {
    id: 2,
    topic: "Ekosistem",
    subtopic: "Tingkatan Organisasi",
    difficulty: "Mudah",
    question: "Sekelompok individu dari spesies Rhizophora mucronata (bakau) yang hidup di pesisir pantai Negeri Amahai pada waktu tertentu disebut...",
    stimulus: "Organisasi kehidupan dimulai dari molekul, sel, jaringan, organ, individu, populasi, komunitas, ekosistem, bioma, hingga biosfer.",
    options: [
      "A. Individu",
      "B. Populasi",
      "C. Komunitas",
      "D. Ekosistem",
      "E. Bioma"
    ],
    answer: 1,
    explanation: "Populasi adalah sekumpulan individu sejenis (spesies sama) yang hidup pada tempat dan waktu yang sama."
  },
  {
    id: 3,
    topic: "Ekosistem",
    subtopic: "Interaksi Antarkomponen",
    difficulty: "Sedang",
    question: "Pada ekosistem terumbu karang di Perairan Laut Banda, terjadi interaksi antara Zooxanthellae (alga fotosintetik) dengan polip karang. Alga memperoleh tempat tinggal dan nutrien, sedangkan karang memperoleh glukosa dan oksigen. Bentuk interaksi ini dinamakan...",
    stimulus: "Interaksi antarorganisme dapat berupa simbiotik (mutualisme, komensalisme, parasitisme) maupun non-simbiotik (kompetisi, predasi).",
    options: [
      "A. Komensalisme",
      "B. Parasitisme",
      "C. Mutualisme",
      "D. Predasi",
      "E. Amensalisme"
    ],
    answer: 2,
    explanation: "Kedua pihak mendapatkan keuntungan seimbang, sehingga hubungan ini adalah simbiosis mutualisme."
  },
  {
    id: 4,
    topic: "Ekosistem",
    subtopic: "Rantai Makanan & Jaring-jaring",
    difficulty: "Sedang",
    question: "Perhatikan alur rantai makanan berikut:\nPhytoplankton → Zooplankton → Ikan Puri (Teri) → Ikan Cakalang → Bakteri Pengurai.\nBerdasarkan alur tersebut, kedudukan Ikan Cakalang adalah sebagai...",
    stimulus: "Aliran energi berpindah dari produsen ke konsumen tingkat I, II, III dan seterusnya hingga pengurai.",
    options: [
      "A. Produsen primer",
      "B. Konsumen primer (Tingkat I)",
      "C. Konsumen sekunder (Tingkat II)",
      "D. Konsumen tersier (Tingkat III)",
      "E. Pengurai (Dekomposer)"
    ],
    answer: 3,
    explanation: "Phytoplankton (Produsen) → Zooplankton (Konsumen I) → Ikan Puri (Konsumen II) → Ikan Cakalang (Konsumen III)."
  },
  {
    id: 5,
    topic: "Ekosistem",
    subtopic: "Aliran Energi & Piramida Ekologi",
    difficulty: "Sukar",
    question: "Apabila energi kimia yang terkandung pada tingkat produsen (rumput laut) sebesar 10.000 kalori, berapakah perkiraan jumlah energi yang dapat dimanfaatkan oleh konsumen tingkat kedua sesuai dengan hukum kaidah 10% aliran energi?",
    stimulus: "Dalam piramida energi, hanya sekitar 10% energi yang berpindah dari satu tingkatan trofik ke tingkatan trofik di atasnya, sisanya terbuang sebagai panas dan sisa metabolisme.",
    options: [
      "A. 10.000 kalori",
      "B. 1.000 kalori",
      "C. 100 kalori",
      "D. 10 kalori",
      "E. 1 kalori"
    ],
    answer: 2,
    explanation: "Produsen (10.000 kal) → Konsumen I (10% = 1.000 kal) → Konsumen II (10% dari 1.000 = 100 kal)."
  },
  {
    id: 6,
    topic: "Ekosistem",
    subtopic: "Daur Biogeokimia",
    difficulty: "Sedang",
    question: "Bakteri Rhizobium yang hidup bersimbiosis pada bintil akar tanaman polong-polongan berperan penting dalam daur nitrogen, yaitu dalam proses...",
    stimulus: "Daur biogeokimia melibatkan perpindahan unsur kimia antara komponen biologis dan geologis bumi.",
    options: [
      "A. Nitrifikasi (mengubah amonia menjadi nitrat)",
      "B. Denitrifikasi (mengubah nitrat menjadi gas nitrogen)",
      "C. Fiksasi nitrogen (mengikat N2 bebas dari udara)",
      "D. Ammonifikasi (membentuk amonia dari bahan organik)",
      "E. Asimilasi (penyerapan nitrat oleh tumbuhan)"
    ],
    answer: 2,
    explanation: "Rhizobium bertugas mengikat/fiksasi gas nitrogen (N2) dari udara menjadi bentuk senyawa ammonium/nitrat yang bisa diserap tumbuhan."
  },
  {
    id: 7,
    topic: "Ekosistem",
    subtopic: "Daur Biogeokimia",
    difficulty: "Sedang",
    question: "Pada daur karbondioksida (C), proses metabolisme organisme yang melepaskan CO2 kembali ke atmosfer adalah...",
    stimulus: "Keseimbangan CO2 dan O2 dijaga oleh proses fotosintesis dan respirasi seluler.",
    options: [
      "A. Fotosintesis dan Transpirasi",
      "B. Respirasi seluler dan Dekomposisi",
      "C. Kondensasi dan Evaporasi",
      "D. Nitrifikasi dan Fiksasi",
      "E. Presipitasi dan Sublimasi"
    ],
    answer: 1,
    explanation: "Respirasi seluler oleh mahluk hidup dan pembusukan/dekomposisi oleh pengurai melepaskan gas CO2 ke udara."
  },
  {
    id: 8,
    topic: "Ekosistem",
    subtopic: "Keseimbangan Ekosistem",
    difficulty: "Sukar",
    question: "Di suatu kebun palem-paleman, populasi burung hantu mengalami penurunan drastis akibat pemburu liar. Dampak ekologis langsung yang akan terjadi pada jaring-jaring makanan tersebut adalah...",
    stimulus: "Hilangnya satu spesies sebagai predator puncak dapat memicu ketidakseimbangan populasi pada tingkat trofik di bawahnya.",
    options: [
      "A. Populasi tikus meningkat pesat sehingga memicu kerusakan tanaman",
      "B. Populasi tanaman palem meningkat drastis",
      "C. Populasi elang sebagai kompetitor burung hantu ikut punah",
      "D. Jumlah pengurai berkurang drastis",
      "E. Populasi serangga herbivora langsung habis"
    ],
    answer: 0,
    explanation: "Burung hantu adalah predator utama tikus. Jika pemangsa berkurang, populasi hama tikus akan melonjak tak terkendali."
  },
  {
    id: 9,
    topic: "Ekosistem",
    subtopic: "Perubahan Lingkungan",
    difficulty: "Sedang",
    question: "Penggunaan pupuk kimia sintetis secara berlebihan pada lahan pertanian dekat aliran sungai dapat menyebabkan eutrofikasi. Gejala utama eutrofikasi ditandai dengan...",
    stimulus: "Pencemaran air akibat akumulasi nutrisi fosfat dan nitrat memicu peledakan pertumbuhan alga (algal bloom).",
    options: [
      "A. Air sungai menjadi sangat jernih dan bening",
      "B. Pertumbuhan enceng gondok/alga yang sangat pesat melingkupi permukaan air",
      "C. Meningkatnya kadar oksigen terlarut (DO) di dalam air dasar",
      "D. Populasi ikan makin berkembang pesat",
      "E. Menurunnya angka kematian organisme akuatik"
    ],
    answer: 1,
    explanation: "Eutrofikasi memicu peledakan alga/tanaman air (algal bloom) yang menyumbat masuknya sinar matahari dan mengurangi O2 terlarut saat mati terurai."
  },
  {
    id: 10,
    topic: "Ekosistem",
    subtopic: "Piramida Ekologi",
    difficulty: "Mudah",
    question: "Piramida jumlah menunjukkan jumlah individu pada setiap tingkat trofik. Pada ekosistem hutan hujan tropis, piramida jumlah dapat berbentuk terbalik jika...",
    stimulus: "Piramida ekologi terbagi atas piramida jumlah, biomassa, dan energi.",
    options: [
      "A. Satu pohon besar rimbun menopang ribuan serangga herbivora",
      "B. Jumlah rumput jauh lebih banyak daripada populasi kelinci",
      "C. Harimau berjumlah lebih banyak dari kijang",
      "D. Produsen memiliki ukuran sangat kecil dan jumlah sedikit",
      "E. Pengurai tidak berfungsi dengan baik"
    ],
    answer: 0,
    explanation: "Satu individu pohon (produsen = 1) dapat menampung ribuan ulat/serangga (konsumen I = ribuan), sehingga bentuk piramida jumlah menjadi terbalik."
  },
  {
    id: 11,
    topic: "Ekosistem",
    subtopic: "Komponen Ekosistem",
    difficulty: "Mudah",
    question: "Organisme yang memakan sisa-sisa bagian tubuh organisme lain yang telah mati menjadi potongan-potongan kecil (seperti cacing tanah dan teripang) disebut...",
    stimulus: "Pengurai bahan organik terbagi menjadi detritivor dan dekomposer.",
    options: [
      "A. Produsen",
      "B. Herbivora",
      "C. Detritivor",
      "D. Dekomposer (Pengurai mikro)",
      "E. Karnivora"
    ],
    answer: 2,
    explanation: "Detritivor adalah pemakan serpihan organik (detritus), seperti cacing tanah, rayap, dan teripang."
  },
  {
    id: 12,
    topic: "Ekosistem",
    subtopic: "Daur Biogeokimia",
    difficulty: "Sedang",
    question: "Daur air (hidrologi) melibatkan perubahan wujud air secara terus-menerus. Proses penguapan air yang berasal dari jaringan tubuh tumbuhan hidup ke atmosfer disebut...",
    stimulus: "Siklus air melibatkan evaporasi, transpirasi, kondensasi, presipitasi, dan infiltrasi.",
    options: [
      "A. Evaporasi",
      "B. Kondensasi",
      "C. Transpirasi",
      "D. Sublimasi",
      "E. Infiltrasi"
    ],
    answer: 2,
    explanation: "Penguapan dari permukaan tubuh tumbuhan dinamakan transpirasi, sedangkan dari badan air dinamakan evaporasi."
  },
  {
    id: 13,
    topic: "Ekosistem",
    subtopic: "Interaksi Antarkomponen",
    difficulty: "Mudah",
    question: "Hubungan persaingan antara tanaman jagung dan gulma rumput teki di ladang dalam merebutkan unsur hara dan air tanah dinamakan interaksi...",
    stimulus: "Kompetisi terjadi apabila dua spesies atau lebih membutuhkan sumber daya yang sama yang terbatas.",
    options: [
      "A. Netralisme",
      "B. Kompetisi",
      "C. Predasi",
      "D. Parasitisme",
      "E. Komensalisme"
    ],
    answer: 1,
    explanation: "Persaingan perebutan nutrisi tanah antara dua tanaman adalah interaksi kompetisi."
  },
  {
    id: 14,
    topic: "Ekosistem",
    subtopic: "Perubahan Lingkungan",
    difficulty: "Sukar",
    question: "Fenomena Global Warming (Pemanasan Global) sangat berkaitan erat dengan daur biogeokimia unsur...",
    stimulus: "Akumulasi gas rumah kaca di lapisan troposfer menahan radiasi gelombang panjang inframerah.",
    options: [
      "A. Nitrogen (N)",
      "B. Fosfor (P)",
      "C. Karbon (C)",
      "D. Belerang (S)",
      "E. Kalsium (Ca)"
    ],
    answer: 2,
    explanation: "Peningkatan CO2 dan CH4 (metana) dari aktivitas pembakaran bahan bakar fosil mengganggu siklus Karbon (C)."
  },
  {
    id: 15,
    topic: "Ekosistem",
    subtopic: "Rantai Makanan",
    difficulty: "Sedang",
    question: "Urutan tingkatan trofik yang benar dalam suatu ekosistem padang rumput adalah...",
    stimulus: "Tingkat trofik disusun berdasarkan posisi organisme dalam memperoleh energi.",
    options: [
      "A. Rumput (Trofik I) → Belalang (Trofik II) → Katak (Trofik III) → Ular (Trofik IV)",
      "B. Belalang (Trofik I) → Rumput (Trofik II) → Katak (Trofik III) → Ular (Trofik IV)",
      "C. Rumput (Trofik I) → Katak (Trofik II) → Belalang (Trofik III) → Ular (Trofik IV)",
      "D. Ular (Trofik I) → Katak (Trofik II) → Belalang (Trofik III) → Rumput (Trofik IV)",
      "E. Pengurai (Trofik I) → Rumput (Trofik II) → Belalang (Trofik III) → Katak (Trofik IV)"
    ],
    answer: 0,
    explanation: "Trofik I ditempati oleh Produsen (Rumput), Trofik II Konsumen I (Belalang), Trofik III Konsumen II (Katak), dan Trofik IV Konsumen III (Ular)."
  },

  // ------------------ VIRUS (15 Soal) ------------------
  {
    id: 16,
    topic: "Virus",
    subtopic: "Karakteristik & Ciri Virus",
    difficulty: "Mudah",
    question: "Virus dikatakan sebagai makhluk peralihan antara benda mati dan makhluk hidup. Virus dianggap sebagai benda mati karena dapat...",
    stimulus: "Virus memiliki sifat unik yang tidak dimiliki oleh sel makhluk hidup lainnya.",
    options: [
      "A. Berproduksi di dalam sel inang",
      "B. Dikristalkan saat berada di luar sel hidup",
      "C. Memiliki materi genetik DNA dan RNA bersamaan",
      "D. Melakukan respirasi seluler mandiri",
      "E. Membentuk organel sel seperti ribosom"
    ],
    answer: 1,
    explanation: "Virus dapat dikristalkan seperti benda mati jika berada di luar sel inang tanpa aktivitas metabolisme."
  },
  {
    id: 17,
    topic: "Virus",
    subtopic: "Sejarah Penemuan Virus",
    difficulty: "Sedang",
    question: "Ilmuwan yang pertama kali membuktikan bahwa agen penyebab penyakit bintik kuning (mosaik) pada daun tembakau dapat lolos dari saringan bakteri adalah...",
    stimulus: "Penemuan virus diawali oleh penelitian penyakit mosaik tembakau pada abad ke-19.",
    options: [
      "A. Louis Pasteur dan Robert Koch",
      "B. Dmitri Ivanovsky dan Martinus Beijerinck",
      "C. Edward Jenner dan Jonas Salk",
      "D. Alexander Fleming dan Robert Hooke",
      "E. Charles Darwin dan Gregor Mendel"
    ],
    answer: 1,
    explanation: "Dmitri Ivanovsky menemukan agen penyakit tembakau lolos saring bakteri, dan Beijerinck menamakannya virus."
  },
  {
    id: 18,
    topic: "Virus",
    subtopic: "Struktur Tubuh Virus",
    difficulty: "Mudah",
    question: "Selubung protein yang membungkus materi genetik virus dinamakan...",
    stimulus: "Struktur dasar virus terdiri atas materi genetik dan kapsul penyelubung.",
    options: [
      "A. Kapsomer",
      "B. Kapsid",
      "C. Glikoprotein",
      "D. Membran plasma",
      "E. Peptidoglikan"
    ],
    answer: 1,
    explanation: "Kapsid adalah selubung protein yang tersusun dari unit-unit kecil bernama kapsomer."
  },
  {
    id: 19,
    topic: "Virus",
    subtopic: "Struktur Tubuh Virus",
    difficulty: "Sedang",
    question: "Salah satu alasan utama mengapa virus tergolong Parasit Obligat Intraseluler dan tidak dapat dikategorikan sebagai sel (aseluler) adalah...",
    stimulus: "Sel minimal memiliki sitoplasma, membran sel, dan organel pembentuk protein.",
    options: [
      "A. Virus tidak memiliki sitoplasma, organel sel, dan tidak mampu menghasilkan ATP sendiri",
      "B. Virus berukuran sangat besar sehingga menyumbat sel",
      "C. Virus memiliki inti sel yang terlindung membran ganda",
      "D. Virus dapat membelah diri dengan cara pembelahan biner",
      "E. Virus mengandung dinding sel dari zat kitin"
    ],
    answer: 0,
    explanation: "Virus bersifat aseluler karena tidak memiliki sitoplasma, ribosom, dan sistem enzim metabolisme energi (ATP)."
  },
  {
    id: 20,
    topic: "Virus",
    subtopic: "Reproduksi / Siklus Daur Virus",
    difficulty: "Sedang",
    question: "Perhatikan tahapan replikasi virus berikut:\n1. Penetrasi/Injeksi\n2. Adsorpsi (Penempelan)\n3. Lisis\n4. Sintesis/Aplikasi\n5. Perakitan\nUrutan tahapan daur litik Bacteriofag yang tepat adalah...",
    stimulus: "Siklus litik menghentikan fungsi sel inang dan mengakhiri hidup sel inang dengan kehancuran (lisis).",
    options: [
      "A. 2 - 1 - 4 - 5 - 3",
      "B. 1 - 2 - 4 - 5 - 3",
      "C. 2 - 4 - 1 - 5 - 3",
      "D. 5 - 4 - 2 - 1 - 3",
      "E. 2 - 1 - 5 - 4 - 3"
    ],
    answer: 0,
    explanation: "Urutan daur litik: Adsorpsi (2) → Penetrasi/Injeksi (1) → Sintesis (4) → Perakitan (5) → Lisis (3)."
  },
  {
    id: 21,
    topic: "Virus",
    subtopic: "Siklus Lisogenik",
    difficulty: "Sukar",
    question: "Perbedaan mendasar antara siklus litik dan siklus lisogenik pada replikasi virus adalah...",
    stimulus: "Virus dapat bereplikasi melalui jalur litik atau lisogenik tergantung kondisi sel inang.",
    options: [
      "A. Pada siklus lisogenik sel inang langsung hancur/lisis pada tahap akhir",
      "B. Pada siklus lisogenik DNA virus menyatu dengan DNA bakteri membentuk Profag tanpa merusak sel inang",
      "C. Siklus litik membutuhkan waktu jauh lebih lama dibanding lisogenik",
      "D. Siklus lisogenik tidak membutuhkan tahap adsorpsi",
      "E. Siklus litik tidak menghasilkan virion baru"
    ],
    answer: 1,
    explanation: "Pada siklus lisogenik, materi genetik virus menyisip ke genom inang membentuk Profag tanpa merusak sel inang."
  },
  {
    id: 22,
    topic: "Virus",
    subtopic: "Penyakit Akibat Virus pada Manusia",
    difficulty: "Mudah",
    question: "Virus SARS-CoV-2 yang menyebabkan pandemi global COVID-19 utamanya menyerang sistem organ...",
    stimulus: "Virus menginfeksi sel target spesifik berdasarkan reseptor sel permukaan.",
    options: [
      "A. Pencernaan",
      "B. Pernapasan",
      "C. Saraf pusat",
      "D. Ekskresi",
      "E. Peredaran darah"
    ],
    answer: 1,
    explanation: "SARS-CoV-2 menyerang sel-sel epitel saluran pernapasan manusia melalui reseptor ACE2."
  },
  {
    id: 23,
    topic: "Virus",
    subtopic: "Penyakit Akibat Virus pada Manusia",
    difficulty: "Sedang",
    question: "Human Immunodeficiency Virus (HIV) sangat berbahaya bagi tubuh manusia karena virus ini secara spesifik menginfeksi dan merusak sel...",
    stimulus: "HIV menyebabkan sindrom penurunan kekebalan tubuh (AIDS).",
    options: [
      "A. Eritrosit (Sel darah merah)",
      "B. Leukosit Limfosit T CD4+ (Sistem Kekebalan)",
      "C. Trombosit (Keping darah)",
      "D. Neuron (Sel saraf)",
      "E. Hepatosit (Sel hati)"
    ],
    answer: 1,
    explanation: "HIV merusak sel limfosit T CD4+, yang berperan vital dalam mengatur sistem kekebalan tubuh."
  },
  {
    id: 24,
    topic: "Virus",
    subtopic: "Penyakit Akibat Virus pada Hewan",
    difficulty: "Sedang",
    question: "Penyakit NCD (New Castle Disease) atau 'Tetelo' yang sering menyerang unggas dengan gejala kejang dan leher terbalik disebabkan oleh virus dari kelompok...",
    stimulus: "Infeksi virus pada hewan ternak dapat menyebabkan kerugian ekonomi besar.",
    options: [
      "A. Paramyxovirus",
      "B. Rhabdovirus",
      "C. Adenovirus",
      "D. Retrovirus",
      "E. Coronavirus"
    ],
    answer: 0,
    explanation: "NCD (Tetelo) pada unggas disebabkan oleh Avian Paramyxovirus type 1."
  },
  {
    id: 25,
    topic: "Virus",
    subtopic: "Peranan Virus Menguntungkan",
    difficulty: "Sukar",
    question: "Meskipun sering merugikan, virus dapat dimanfaatkan dalam bidang bioteknologi modern. Salah satu peranan virus yang menguntungkan adalah...",
    stimulus: "Teknologi rekayasa genetika memanfaatkan virus sebagai vektor gen.",
    options: [
      "A. Pembuatan pupuk organik cair",
      "B. Vektor dalam terapi gen dan pembuatan vaksin",
      "C. Pengolahan limbah minyak di laut",
      "D. Fermentasi keju dan yogurt",
      "E. Penghasil antibiotik penicilin"
    ],
    answer: 1,
    explanation: "Virus dimanfaatkan sebagai vektor pembawa gen sehat pada terapi gen dan bahan pembuat vaksin."
  },
  {
    id: 26,
    topic: "Virus",
    subtopic: "Upaya Pencegahan & Vaksinasi",
    difficulty: "Sedang",
    question: "Vaksinasi merupakan tindakan pencegahan efektif terhadap penyakit akibat virus. Prinsip kerja utama vaksin di dalam tubuh adalah...",
    stimulus: "Vaksin memicu respons imunitas spesifik tanpa menyebabkan penyakit parah.",
    options: [
      "A. Membunuh langsung seluruh virus yang masuk dengan zat kimia",
      "B. Merangsang pembentukan antibodi dan sel memori imun spesifik",
      "C. Mengganti sel tubuh yang rusak dengan sel baru",
      "D. Menetralkan asam lambung agar virus mati",
      "E. Menyediakan nutrisi tambahan bagi virus"
    ],
    answer: 1,
    explanation: "Vaksin melatih sistem imun dengan mengenalkan antigen yang dilemahkan/ditiadakan sehingga terbentuk antibodi dan sel memori."
  },
  {
    id: 27,
    topic: "Virus",
    subtopic: "Penyakit Akibat Virus pada Manusia",
    difficulty: "Mudah",
    question: "Penyakit Rabies yang ditularkan melalui gigitan hewan terinfeksi seperti anjing atau kera disebabkan oleh virus...",
    stimulus: "Rabies menyerang sistem saraf pusat dan bersifat zoonosis.",
    options: [
      "A. Lyssavirus / Rhabdovirus",
      "B. Flavivirus",
      "C. Orthomyxovirus",
      "D. Rotavirus",
      "E. Hantavirus"
    ],
    answer: 0,
    explanation: "Rabies disebabkan oleh Rhabdovirus (genus Lyssavirus)."
  },
  {
    id: 28,
    topic: "Virus",
    subtopic: "Karakteristik & Ciri Virus",
    difficulty: "Mudah",
    question: "Materi genetik yang terkandung di dalam satu partikel virus (virion) adalah...",
    stimulus: "Asam nukleat virus membawa informasi genetik untuk replikasi.",
    options: [
      "A. DNA dan RNA secara bersamaan dalam satu kapsid",
      "B. Hanya DNA saja atau RNA saja, tidak pernah keduanya sekaligus",
      "C. Protein plasma tanpa asam nukleat",
      "D. Hibrida karbohidrat dan lemak",
      "E. ATP dan Enzim fotosintesis"
    ],
    answer: 1,
    explanation: "Virus hanya memiliki salah satu jenis asam nukleat: DNA saja atau RNA saja."
  },
  {
    id: 29,
    topic: "Virus",
    subtopic: "Siklus Lisogenik",
    difficulty: "Sukar",
    question: "Ketika kondisi sel inang melemah atau terkena paparan radiasi ultraviolet, profag pada daur lisogenik dapat terlepas dari kromosom inang dan memasuki...",
    stimulus: "Peralihan dari lisogenik menuju litik dinamakan induksi.",
    options: [
      "A. Fase istirahat permanen",
      "B. Daur Litik (Sintesis dan Lisis)",
      "C. Fase kematian virus",
      "D. Daur meiosis",
      "E. Pembentukan spora"
    ],
    answer: 1,
    explanation: "Induksi oleh zat kimia/UV menyebabkan profag terlepas dan beralih ke daur litik hingga sel lisis."
  },
  {
    id: 30,
    topic: "Virus",
    subtopic: "Upaya Pencegahan & Kesehatan",
    difficulty: "Sedang",
    question: "Mengapa antibiotik (seperti Penisilin atau Amoksisilin) TIDAK efektif untuk mengobati flu atau batuk yang disebabkan oleh infeksi virus?",
    stimulus: "Antibiotik memiliki sasaran kerja spesifik pada struktur seluler.",
    options: [
      "A. Karena virus berukuran terlalu kecil untuk disentuh obat",
      "B. Karena antibiotik dirancang spesifik merusak dinding sel atau metabolisme bakteri, bukan virus",
      "C. Karena antibiotik mempercepat perkembangbiakan virus",
      "D. Karena virus tidak berada di dalam darah",
      "E. Karena antibiotik hanya bekerja pada hewan"
    ],
    answer: 1,
    explanation: "Antibiotik menargetkan dinding sel/ribosom bakteri. Virus tidak bermetabolisme seluler sehingga antibiotik tidak berguna."
  }
];

export default function App() {
  // App Pages: 'landing' | 'student-form' | 'exam' | 'student-result' | 'teacher-login' | 'teacher-dashboard'
  const [page, setPage] = useState('landing');

  // Question Bank state (editable by teacher)
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('bio_questions_v1');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  // Save questions to LocalStorage when updated
  useEffect(() => {
    localStorage.setItem('bio_questions_v1', JSON.stringify(questions));
  }, [questions]);

  // Exam Settings (Teacher controlled)
  const [examSettings, setExamSettings] = useState(() => {
    const saved = localStorage.getItem('bio_exam_settings');
    return saved ? JSON.parse(saved) : {
      durationMinutes: 45,
      shuffleQuestions: false,
      activeStatus: true,
      passcode: 'guru46'
    };
  });

  useEffect(() => {
    localStorage.setItem('bio_exam_settings', JSON.stringify(examSettings));
  }, [examSettings]);

  // Current Active Student Info
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    className: 'X.1',
    rollNumber: ''
  });

  // Student Exam Session State
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedIndex }
  const [flagged, setFlagged] = useState({}); // { questionId: true/false }
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(60 * 60);
  const [activeExamQuestions, setActiveExamQuestions] = useState([]);
  const [examStartTime, setExamStartTime] = useState(null);

  // Student Results History (Stored in LocalStorage)
  const [examResults, setExamResults] = useState(() => {
    const saved = localStorage.getItem('bio_exam_results');
    return saved ? JSON.parse(saved) : [
      {
        id: 'res-1',
        studentName: 'Ahmad Pelupessy',
        className: 'X.1',
        rollNumber: '04',
        score: 86.7,
        correctCount: 26,
        incorrectCount: 4,
        unansweredCount: 0,
        ecoCorrect: 13,
        virusCorrect: 13,
        submittedAt: '2026-10-28 08:30',
        answers: {}
      },
      {
        id: 'res-2',
        studentName: 'Siti Rahma Tuasikal',
        className: 'X.2',
        rollNumber: '18',
        score: 73.3,
        correctCount: 22,
        incorrectCount: 8,
        unansweredCount: 0,
        ecoCorrect: 10,
        virusCorrect: 12,
        submittedAt: '2026-10-28 09:15',
        answers: {}
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bio_exam_results', JSON.stringify(examResults));
  }, [examResults]);

  // Current active result for display in 'student-result' page
  const [currentResult, setCurrentResult] = useState(null);

  // Teacher Authentication state
  const [teacherPasscode, setTeacherPasscode] = useState('');
  const [teacherAuthError, setTeacherAuthError] = useState('');

  // Confirmation Modal state for submit
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Auto-restore saved exam progress on page load if student reloaded during exam
  useEffect(() => {
    const savedSession = localStorage.getItem('bio_current_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.inProgress) {
          setStudentInfo(parsed.studentInfo);
          setUserAnswers(parsed.userAnswers || {});
          setFlagged(parsed.flagged || {});
          setCurrentQIndex(parsed.currentQIndex || 0);
          setTimeLeftSeconds(parsed.timeLeftSeconds || 3600);
          setActiveExamQuestions(parsed.activeExamQuestions || questions);
          setExamStartTime(parsed.examStartTime);
          setPage('exam');
        }
      } catch (e) {
        console.error("Error restoring session", e);
      }
    }
  }, []);

  // Sync current exam state to LocalStorage for reload recovery
  useEffect(() => {
    if (page === 'exam') {
      const sessionData = {
        inProgress: true,
        studentInfo,
        userAnswers,
        flagged,
        currentQIndex,
        timeLeftSeconds,
        activeExamQuestions,
        examStartTime
      };
      localStorage.setItem('bio_current_session', JSON.stringify(sessionData));
    }
  }, [page, userAnswers, flagged, currentQIndex, timeLeftSeconds]);

  // Timer countdown hook
  useEffect(() => {
    let timerId = null;
    if (page === 'exam' && timeLeftSeconds > 0) {
      timerId = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            handleAutoSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [page, timeLeftSeconds]);

  // Start Exam Handler
  const handleStartExam = () => {
    let qList = [...questions];
    if (examSettings.shuffleQuestions) {
      qList.sort(() => Math.random() - 0.5);
    }
    setActiveExamQuestions(qList);
    setUserAnswers({});
    setFlagged({});
    setCurrentQIndex(0);
    setTimeLeftSeconds(examSettings.durationMinutes * 60);
    setExamStartTime(new Date().toISOString());
    setPage('exam');
  };

  // Submit Exam Logic
  const handleCalculateAndSubmit = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let ecoCorrect = 0;
    let virusCorrect = 0;

    activeExamQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined || ans === null) {
        unansweredCount++;
      } else if (ans === q.answer) {
        correctCount++;
        if (q.topic === 'Ekosistem') ecoCorrect++;
        if (q.topic === 'Virus') virusCorrect++;
      } else {
        incorrectCount++;
      }
    });

    const total = activeExamQuestions.length || 30;
    const finalScore = parseFloat(((correctCount / total) * 100).toFixed(1));

    const newResult = {
      id: 'res-' + Date.now(),
      studentName: studentInfo.name,
      className: studentInfo.className,
      rollNumber: studentInfo.rollNumber,
      score: finalScore,
      correctCount,
      incorrectCount,
      unansweredCount,
      ecoCorrect,
      virusCorrect,
      submittedAt: new Date().toLocaleString('id-ID'),
      userAnswers: { ...userAnswers },
      questionsSnapshot: activeExamQuestions
    };

    setExamResults((prev) => [newResult, ...prev]);
    setCurrentResult(newResult);
    localStorage.removeItem('bio_current_session');
    setShowSubmitModal(false);
    setPage('student-result');
  };

  const handleAutoSubmitExam = () => {
    handleCalculateAndSubmit();
  };

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (teacherPasscode === examSettings.passcode) {
      setTeacherAuthError('');
      setPage('teacher-dashboard');
    } else {
      setTeacherAuthError('Kata sandi salah! Silakan coba lagi.');
    }
  };

  const getCategory = (score) => {
    if (score >= 85) return { label: 'Sangat Baik (Sangat Tuntas)', color: 'bg-emerald-600 text-white border-emerald-500' };
    if (score >= 70) return { label: 'Baik (Tuntas)', color: 'bg-teal-600 text-white border-teal-500' };
    if (score >= 55) return { label: 'Cukup (Cukup Tuntas)', color: 'bg-amber-600 text-white border-amber-500' };
    return { label: 'Perlu Bimbingan (Belum Tuntas)', color: 'bg-rose-600 text-white border-rose-500' };
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* HEADER NAVBAR */}
      <header className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Title */}
          <div
            onClick={() => setPage('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition">
              <Dna className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                BIO SMART ASSESSMENT
              </h1>
              <p className="text-[10px] text-emerald-200 tracking-wide uppercase">
                SMA Negeri 46 Maluku Tengah • Biologi Kelas X Fase E
              </p>
            </div>
          </div>

          {/* Right Header Navigation & Timer */}
          <div className="flex items-center space-x-3">
            {page === 'exam' && (
              <div className="flex items-center space-x-2 bg-emerald-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/30 text-amber-300">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono font-bold text-xs sm:text-sm">{formatTimer(timeLeftSeconds)}</span>
              </div>
            )}

            {page === 'teacher-dashboard' ? (
              <button
                onClick={() => setPage('landing')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Keluar Dashboard
              </button>
            ) : (
              <button
                onClick={() => setPage('teacher-login')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Portal Guru
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* ================= PAGE 1: LANDING PAGE ================= */}
        {page === 'landing' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Asesmen Sumatif Awal Semester Ganjil</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  BIO SMART ASSESSMENT
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Platform asesmen digital Biologi interaktif berbasis web untuk menguji pemahaman konsep peserta didik Kelas X (Fase E) pada materi utama <strong>Ekosistem</strong> dan <strong>Virus</strong>.
                </p>

                {/* Call To Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      if (!examSettings.activeStatus) {
                        alert("Mohon maaf, akses ujian saat ini sedang ditutup oleh guru pengampu.");
                        return;
                      }
                      setPage('student-form');
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> MULAI ASESMEN SISWA
                  </button>

                  <button
                    onClick={() => setPage('teacher-login')}
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" /> Masuk Portal Guru
                  </button>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Kisi-kisi */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
                  <ListCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Struktur & Jumlah Soal</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Total <strong>30 Soal Pilihan Ganda</strong> dengan 5 opsi jawaban (A, B, C, D, E).
                </p>
                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Materi Ekosistem:</span>
                    <span className="text-emerald-700 font-bold">15 Soal</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Materi Virus:</span>
                    <span className="text-teal-700 font-bold">15 Soal</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Durasi Ujian:</span>
                    <span className="text-slate-800 font-bold">{examSettings.durationMinutes} Menit</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Petunjuk Ujian */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Petunjuk Pelaksanaan</h3>
                <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside leading-relaxed">
                  <li>Isi Nama Lengkap, Kelas, dan Nomor Absen dengan teliti.</li>
                  <li>Jawaban tersimpan otomatis secara *real-time*.</li>
                  <li>Gunakan tombol <strong>Ragu-ragu</strong> jika ingin meninjau ulang.</li>
                  <li>Hasil dan analisis nilai langsung muncul setelah selesai.</li>
                </ul>
              </div>

              {/* Card 3: Profil Pengajar */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">Satuan Pendidikan</h3>
                <div className="text-slate-600 text-sm space-y-2">
                  <p className="font-semibold text-slate-800">SMA Negeri 46 Maluku Tengah</p>
                  <p>Mata Pelajaran: <strong>Biologi (Fase E)</strong></p>
                  <p>Guru Pengampu: <br/><span className="text-emerald-700 font-medium">Nur Umi Marasabessy, S.Pd., Gr.</span></p>
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">Tahun Ajaran 2026/2027</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: STUDENT REGISTRATION FORM ================= */}
        {page === 'student-form' && (
          <div className="max-w-xl mx-auto py-8 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white text-center">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <User className="w-8 h-8 text-emerald-200" />
                </div>
                <h3 className="text-2xl font-bold">Identitas Peserta Didik</h3>
                <p className="text-emerald-100 text-xs mt-1">Lengkapi data diri Anda sebelum mengawali ujian asesmen sumatif.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleStartExam(); }} className="p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Lengkap Peserta Didik *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Pelupessy"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kelas *</label>
                    <select
                      value={studentInfo.className}
                      onChange={(e) => setStudentInfo({ ...studentInfo, className: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition bg-white"
                    >
                      <option value="X.1">X.1</option>
                      <option value="X.2">X.2</option>
                      <option value="X.3">X.3</option>
                      <option value="X.4">X.4</option>
                      <option value="X.5">X.5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nomor Absen *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="50"
                      placeholder="Contoh: 08"
                      value={studentInfo.rollNumber}
                      onChange={(e) => setStudentInfo({ ...studentInfo, rollNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1.5">
                  <p className="font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Aturan & Ketentuan Ujian:
                  </p>
                  <p>• Durasi pengerjaan adalah <strong>{examSettings.durationMinutes} Menit</strong>.</p>
                  <p>• Tidak diperkenankan membuka catatan atau bekerjasama.</p>
                  <p>• Jawaban tersimpan otomatis jika terjadi gangguan koneksi.</p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPage('landing')}
                    className="w-1/3 py-3.5 px-4 rounded-xl border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    MULAI UJIAN SEKARANG <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: ACTIVE EXAM SESSION ================= */}
        {page === 'exam' && activeExamQuestions.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Info Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm">
                  {studentInfo.rollNumber}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{studentInfo.name}</h4>
                  <p className="text-xs text-slate-500">Kelas {studentInfo.className} • Bio Smart Assessment</p>
                </div>
              </div>

              {/* Progress Count */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
                  Terjawab: <span className="text-emerald-700 font-bold">{Object.keys(userAnswers).length}</span> / {activeExamQuestions.length}
                </div>
                <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-700">
                  Ragu-ragu: <span className="font-bold">{Object.values(flagged).filter(Boolean).length}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* LEFT: QUESTION PANEL (3 cols) */}
              <div className="lg:col-span-3 space-y-6">
                {(() => {
                  const q = activeExamQuestions[currentQIndex];
                  const currentAns = userAnswers[q.id];
                  const isFlagged = !!flagged[q.id];

                  return (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
                      {/* Question Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-sm">
                            Soal No. {currentQIndex + 1}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                            {q.topic} • {q.subtopic}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                            q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            q.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>

                        {/* Ragu-ragu Toggle */}
                        <button
                          onClick={() => setFlagged({ ...flagged, [q.id]: !isFlagged })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            isFlagged
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                          {isFlagged ? 'Ditandai (Ragu-ragu)' : 'Tandai Ragu-ragu'}
                        </button>
                      </div>

                      {/* Stimulus Box */}
                      {q.stimulus && (
                        <div className="bg-slate-50 border-l-4 border-emerald-600 p-4 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                          <strong className="not-italic text-emerald-900 block mb-1 font-semibold">Stimulus / Konteks Soal:</strong>
                          {q.stimulus}
                        </div>
                      )}

                      {/* Question Text */}
                      <div className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                        {q.question}
                      </div>

                      {/* Options List */}
                      <div className="space-y-3 pt-2">
                        {q.options.map((optionText, optIdx) => {
                          const isSelected = currentAns === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                              className={`w-full text-left p-4 rounded-2xl border transition flex items-start space-x-3 ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium shadow-sm ring-2 ring-emerald-500/20'
                                  : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 text-slate-700'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-slate-300 text-slate-500 bg-white'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="text-sm leading-relaxed">{optionText}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                        <button
                          disabled={currentQIndex === 0}
                          onClick={() => setCurrentQIndex((prev) => prev - 1)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" /> Sebelumnya
                        </button>

                        {currentQIndex < activeExamQuestions.length - 1 ? (
                          <button
                            onClick={() => setCurrentQIndex((prev) => prev + 1)}
                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow transition"
                          >
                            Berikutnya <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowSubmitModal(true)}
                            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition"
                          >
                            AKHIRI UJIAN <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* RIGHT: QUESTION NAVIGATION GRID (1 col) */}
              <div className="space-y-4">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Navigasi Soal</span>
                    <span className="text-xs text-slate-500 font-normal">30 Soal</span>
                  </h4>

                  {/* Grid Buttons */}
                  <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto p-1">
                    {activeExamQuestions.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isFlagged = !!flagged[q.id];
                      const isCurrent = idx === currentQIndex;

                      let btnStyle = "bg-slate-100 text-slate-600 border-slate-200";
                      if (isCurrent) {
                        btnStyle = "ring-2 ring-emerald-600 font-extrabold shadow-md scale-105";
                      }
                      if (isFlagged) {
                        btnStyle += " bg-amber-400 text-slate-900 border-amber-500";
                      } else if (isAnswered) {
                        btnStyle += " bg-emerald-600 text-white border-emerald-700";
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQIndex(idx)}
                          className={`h-9 rounded-xl font-medium text-xs border transition flex items-center justify-center ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 bg-emerald-600 rounded"></div>
                      <span className="text-slate-600">Sudah Dijawab</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 bg-amber-400 rounded"></div>
                      <span className="text-slate-600">Ragu-ragu</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 bg-slate-100 border border-slate-300 rounded"></div>
                      <span className="text-slate-600">Belum Dijawab</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="w-full mt-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow"
                  >
                    Selesaikan Ujian Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMATION SUBMIT MODAL */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-scaleUp">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Konfirmasi Pengiriman Ujian</h3>
              <p className="text-slate-600 text-xs text-center leading-relaxed mb-6">
                Apakah Anda yakin ingin mengakhiri sesi asesmen? Jawaban tidak dapat diubah setelah dikirimkan.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span>Jumlah Soal Dijawab:</span>
                  <span className="font-bold text-emerald-700">{Object.keys(userAnswers).length} dari 30</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Jumlah Ragu-ragu:</span>
                  <span className="font-bold text-amber-600">{Object.values(flagged).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Belum Dijawab:</span>
                  <span className="font-bold text-rose-600">{30 - Object.keys(userAnswers).length}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
                >
                  Kembali Periksa
                </button>
                <button
                  onClick={handleCalculateAndSubmit}
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                >
                  Ya, Kirimkan Jawaban
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 4: STUDENT RESULT REPORT ================= */}
        {page === 'student-result' && currentResult && (
          <div className="max-w-3xl mx-auto py-6 space-y-6 animate-fadeIn">
            {/* Print Header banner */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-6 print:shadow-none">
              {/* Logo & School Header */}
              <div className="text-center border-b border-slate-200 pb-6">
                <div className="inline-flex p-3 bg-emerald-100 rounded-2xl text-emerald-800 mb-2">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">HASIL ASESMEN SUMATIF BIOLOGI</h2>
                <p className="text-sm font-semibold text-emerald-700 mt-1">SMA NEGERI 46 MALUKU TENGAH</p>
                <p className="text-xs text-slate-500">Materi: Ekosistem & Virus • Kelas X Fase E</p>
              </div>

              {/* Student Bio Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Nama Peserta Didik</span>
                  <strong className="text-slate-800">{currentResult.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Kelas / Absen</span>
                  <strong className="text-slate-800">Kelas {currentResult.className} (No. {currentResult.rollNumber})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Waktu Selesai</span>
                  <strong className="text-slate-800">{currentResult.submittedAt}</strong>
                </div>
              </div>

              {/* Main Score Display Card */}
              <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-md relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-emerald-200 font-bold mb-1">NILAI AKHIR ASESMEN</p>
                <div className="text-5xl sm:text-6xl font-black my-2 text-amber-300 font-mono tracking-tight">
                  {currentResult.score}
                </div>

                {/* Category Pill */}
                {(() => {
                  const cat = getCategory(currentResult.score);
                  return (
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border mt-2 ${cat.color}`}>
                      Kategori: {cat.label}
                    </span>
                  );
                })()}

                <p className="text-xs text-emerald-100/80 mt-3 max-w-md mx-auto">
                  Rumus Penilaian: (Jumlah Benar / Total Soal) × 100.
                </p>
              </div>

              {/* Score Breakdown Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <span className="text-xs text-emerald-700 font-semibold block">Jawaban Benar</span>
                  <span className="text-2xl font-black text-emerald-800">{currentResult.correctCount}</span>
                </div>
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <span className="text-xs text-rose-700 font-semibold block">Jawaban Salah</span>
                  <span className="text-2xl font-black text-rose-800">{currentResult.incorrectCount}</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs text-slate-600 font-semibold block">Tidak Dijawab</span>
                  <span className="text-2xl font-black text-slate-700">{currentResult.unansweredCount}</span>
                </div>
              </div>

              {/* Topic Breakdown Progress */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">Analisis Capaian Per Materi</h4>
                
                {/* Ekosistem Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                    <span>Materi 1: Ekosistem (15 Soal)</span>
                    <span className="text-emerald-700">{currentResult.ecoCorrect} / 15 Benar ({Math.round((currentResult.ecoCorrect/15)*100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${(currentResult.ecoCorrect/15)*100}%` }}></div>
                  </div>
                </div>

                {/* Virus Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                    <span>Materi 2: Virus (15 Soal)</span>
                    <span className="text-teal-700">{currentResult.virusCorrect} / 15 Benar ({Math.round((currentResult.virusCorrect/15)*100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${(currentResult.virusCorrect/15)*100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Teacher Validation Signature Box */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
                <div>
                  <p>SMA Negeri 46 Maluku Tengah</p>
                  <p className="text-[10px] text-slate-400">Dicetak secara otomatis oleh sistem Bio Smart Assessment</p>
                </div>
                <div className="text-center">
                  <p className="mb-8">Guru Mata Pelajaran Biologi,</p>
                  <p className="font-bold text-slate-900 underline">Nur Umi Marasabessy, S.Pd., Gr.</p>
                  <p className="text-[10px] text-slate-500">NIP. 19880412 201503 2 004</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow"
                >
                  <Printer className="w-4 h-4" /> Cetak Laporan Hasil (PDF)
                </button>
                <button
                  onClick={() => setPage('landing')}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
                >
                  Selesai & Kembali ke Beranda
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 5: TEACHER LOGIN ================= */}
        {page === 'teacher-login' && (
          <div className="max-w-md mx-auto py-12 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white p-6 text-center">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Autentikasi Dashboard Guru</h3>
                <p className="text-slate-400 text-xs mt-1">Khusus Pengelola & Guru Biologi SMAN 46 Maluku Tengah</p>
              </div>

              <form onSubmit={handleTeacherLogin} className="p-6 space-y-4">
                {teacherAuthError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> {teacherAuthError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kata Sandi Guru (Default: guru46)</label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan sandi..."
                    value={teacherPasscode}
                    onChange={(e) => setTeacherPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 transition"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPage('landing')}
                    className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    Masuk Dashboard <LogIn className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= PAGE 6: TEACHER DASHBOARD ================= */}
        {page === 'teacher-dashboard' && (
          <TeacherDashboardView
            questions={questions}
            setQuestions={setQuestions}
            examResults={examResults}
            setExamResults={setExamResults}
            examSettings={examSettings}
            setExamSettings={setExamSettings}
            onViewStudentDetail={(res) => {
              setCurrentResult(res);
              setPage('student-result');
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-semibold text-slate-300">BIO SMART ASSESSMENT • SMAN 46 MALUKU TENGAH</p>
          <p>Dikembangkan untuk Asesmen Sumatif Biologi Kelas X (Fase E) oleh Nur Umi Marasabessy, S.Pd., Gr.</p>
          <p className="text-[10px] text-slate-500">© 2026 Educational Technology Development. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// TEACHER DASHBOARD COMPONENT
// ==========================================
function TeacherDashboardView({
  questions,
  setQuestions,
  examResults,
  setExamResults,
  examSettings,
  setExamSettings,
  onViewStudentDetail
}) {
  const [tab, setTab] = useState('results'); // 'results' | 'analytics' | 'questions' | 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  // New Question Form state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQ, setNewQ] = useState({
    topic: 'Ekosistem',
    subtopic: 'Umum',
    difficulty: 'Sedang',
    question: '',
    stimulus: '',
    options: ['', '', '', '', ''],
    answer: 0,
    explanation: ''
  });

  // Calculate Metrics
  const totalStudents = examResults.length;
  const avgScore = totalStudents > 0
    ? (examResults.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(1)
    : 0;
  const highestScore = totalStudents > 0
    ? Math.max(...examResults.map((r) => r.score))
    : 0;

  // Filtered Results Table
  const filteredResults = useMemo(() => {
    return examResults.filter((r) => {
      const matchName = r.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchClass = selectedClass === 'ALL' || r.className === selectedClass;
      return matchName && matchClass;
    });
  }, [examResults, searchTerm, selectedClass]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (examResults.length === 0) {
      alert("Belum ada data nilai peserta didik untuk diunduh.");
      return;
    }

    const headers = ["Nama Siswa", "Kelas", "No Absen", "Nilai Akhir", "Benar", "Salah", "Benar Ekosistem", "Benar Virus", "Waktu Ujian"];
    const csvRows = [headers.join(",")];

    examResults.forEach((r) => {
      const row = [
        `"${r.studentName}"`,
        `"${r.className}"`,
        `"${r.rollNumber}"`,
        r.score,
        r.correctCount,
        r.incorrectCount,
        r.ecoCorrect,
        r.virusCorrect,
        `"${r.submittedAt}"`
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Hasil_BioSmart_SMAN46_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Question Handler
  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    const created = {
      ...newQ,
      id: questions.length + 1
    };
    setQuestions([...questions, created]);
    setShowAddQuestionModal(false);
    setNewQ({
      topic: 'Ekosistem',
      subtopic: 'Umum',
      difficulty: 'Sedang',
      question: '',
      stimulus: '',
      options: ['', '', '', '', ''],
      answer: 0,
      explanation: ''
    });
  };

  // Delete Question
  const handleDeleteQuestion = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus soal ini dari bank soal?")) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-emerald-400" />
            Dashboard Guru & Analisis Evaluasi
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Pengelolaan Hasil Asesmen, Bank Soal, dan Konfigurasi SMAN 46 Maluku Tengah
          </p>
        </div>

        {/* Export CSV Button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
        >
          <FileSpreadsheet className="w-4 h-4" /> Unduh Hasil (Excel/CSV)
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase block">Total Peserta Ujian</span>
          <div className="text-3xl font-black text-slate-800 mt-1">{totalStudents}</div>
          <span className="text-[10px] text-emerald-600 mt-1 block">Siswa Terdata</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase block">Rata-rata Nilai</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">{avgScore}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Skala 0 - 100</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase block">Nilai Tertinggi</span>
          <div className="text-3xl font-black text-amber-600 mt-1">{highestScore}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Capaian Maksimum</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase block">Jumlah Bank Soal</span>
          <div className="text-3xl font-black text-teal-700 mt-1">{questions.length}</div>
          <span className="text-[10px] text-teal-600 mt-1 block">Soal Aktif</span>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex flex-wrap bg-slate-50 px-4 pt-3 gap-2">
          <button
            onClick={() => setTab('results')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 ${
              tab === 'results'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListCheck className="w-4 h-4" /> Hasil Peserta Ujian
          </button>
          <button
            onClick={() => setTab('analytics')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 ${
              tab === 'analytics'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Analisis Butir Soal
          </button>
          <button
            onClick={() => setTab('questions')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 ${
              tab === 'questions'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Kelola Bank Soal ({questions.length})
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 ${
              tab === 'settings'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" /> Pengaturan Ujian
          </button>
        </div>

        {/* TAB 1: RESULTS TABLE */}
        {tab === 'results' && (
          <div className="p-6 space-y-4">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama peserta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-700"
              >
                <option value="ALL">Semua Kelas (X.1 - X.5)</option>
                <option value="X.1">Kelas X.1</option>
                <option value="X.2">Kelas X.2</option>
                <option value="X.3">Kelas X.3</option>
                <option value="X.4">Kelas X.4</option>
                <option value="X.5">Kelas X.5</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">No Absen</th>
                    <th className="p-3.5">Nama Peserta Didik</th>
                    <th className="p-3.5">Kelas</th>
                    <th className="p-3.5">Ekosistem</th>
                    <th className="p-3.5">Virus</th>
                    <th className="p-3.5">Nilai Akhir</th>
                    <th className="p-3.5">Waktu Ujian</th>
                    <th className="p-3.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResults.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-slate-400 italic">
                        Belum ada data nilai peserta didik yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredResults.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-bold text-slate-800">{r.rollNumber}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{r.studentName}</td>
                        <td className="p-3.5">{r.className}</td>
                        <td className="p-3.5 text-emerald-700 font-medium">{r.ecoCorrect}/15</td>
                        <td className="p-3.5 text-teal-700 font-medium">{r.virusCorrect}/15</td>
                        <td className="p-3.5 font-mono font-bold text-sm text-emerald-800">{r.score}</td>
                        <td className="p-3.5 text-slate-500">{r.submittedAt}</td>
                        <td className="p-3.5 text-center space-x-1">
                          <button
                            onClick={() => onViewStudentDetail(r)}
                            className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition"
                            title="Lihat Detail & Cetak"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus hasil ujian ${r.studentName}?`)) {
                                setExamResults(examResults.filter((item) => item.id !== r.id));
                              }
                            }}
                            className="p-1.5 bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 transition"
                            title="Hapus Result"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS */}
        {tab === 'analytics' && (
          <div className="p-6 space-y-6">
            <h4 className="font-bold text-slate-800 text-sm">Analisis Butir Soal Kesukaran Soal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ecosystem Topic Stats */}
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                <h5 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" /> Topik Ekosistem (15 Soal)
                </h5>
                <p className="text-xs text-slate-600">Capaian Pemahaman Konsep Komponen, Daur Biogeokimia & Rantai Makanan</p>
                <div className="text-2xl font-black text-emerald-800">
                  {totalStudents > 0
                    ? Math.round((examResults.reduce((a, b) => a + b.ecoCorrect, 0) / (totalStudents * 15)) * 100)
                    : 0}% Rata-rata Benar
                </div>
              </div>

              {/* Virus Topic Stats */}
              <div className="p-5 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
                <h5 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                  <Bug className="w-4 h-4 text-teal-600" /> Topik Virus (15 Soal)
                </h5>
                <p className="text-xs text-slate-600">Capaian Pemahaman Karakteristik, Siklus Replikasi & Peranan Virus</p>
                <div className="text-2xl font-black text-teal-800">
                  {totalStudents > 0
                    ? Math.round((examResults.reduce((a, b) => a + b.virusCorrect, 0) / (totalStudents * 15)) * 100)
                    : 0}% Rata-rata Benar
                </div>
              </div>
            </div>

            {/* List of Difficulty Composition */}
            <div className="pt-4 border-t border-slate-100">
              <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Komposisi Tingkat Kesukaran</h5>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="text-xs text-slate-500 block">Soal Mudah (30%)</span>
                  <span className="font-bold text-emerald-700 text-sm">9 Soal</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="text-xs text-slate-500 block">Soal Sedang (50%)</span>
                  <span className="font-bold text-amber-700 text-sm">15 Soal</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="text-xs text-slate-500 block">Soal Sukar / HOTS (20%)</span>
                  <span className="font-bold text-rose-700 text-sm">6 Soal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUESTION BANK MANAGEMENT */}
        {tab === 'questions' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2">
              <h4 className="font-bold text-slate-800 text-sm">Daftar Bank Soal Asesmen</h4>
              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow"
              >
                <Plus className="w-4 h-4" /> Tambah Soal Baru
              </button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-emerald-800">
                      Soal #{idx + 1} [{q.topic} - {q.subtopic}]
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                        q.difficulty === 'Mudah' ? 'bg-emerald-100 text-emerald-800' :
                        q.difficulty === 'Sedang' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {q.difficulty}
                      </span>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                        title="Hapus Soal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-slate-800 leading-relaxed">{q.question}</p>
                  <p className="text-slate-500 italic">Kunci Jawaban: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXAM SETTINGS */}
        {tab === 'settings' && (
          <div className="p-6 max-w-xl space-y-6">
            <h4 className="font-bold text-slate-800 text-sm">Pengaturan & Konfigurasi Ujian</h4>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Durasi Ujian (Menit)</label>
                <input
                  type="number"
                  value={examSettings.durationMinutes}
                  onChange={(e) => setExamSettings({ ...examSettings, durationMinutes: parseInt(e.target.value) || 60 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kata Sandi Portal Guru</label>
                <input
                  type="text"
                  value={examSettings.passcode}
                  onChange={(e) => setExamSettings({ ...examSettings, passcode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <strong className="block text-slate-800">Acak Urutan Soal</strong>
                  <span className="text-slate-500 text-[11px]">Mengacak tampilan soal untuk setiap siswa</span>
                </div>
                <input
                  type="checkbox"
                  checked={examSettings.shuffleQuestions}
                  onChange={(e) => setExamSettings({ ...examSettings, shuffleQuestions: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <strong className="block text-slate-800">Status Akses Ujian</strong>
                  <span className="text-slate-500 text-[11px]">Buka/tutup akses pengerjaan bagi peserta didik</span>
                </div>
                <button
                  onClick={() => setExamSettings({ ...examSettings, activeStatus: !examSettings.activeStatus })}
                  className={`px-3 py-1.5 rounded-xl font-bold ${
                    examSettings.activeStatus ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {examSettings.activeStatus ? 'AKTIF (DIBUKA)' : 'DITUTUP'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH SOAL */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800">Tambah Soal Baru ke Bank Soal</h3>

            <form onSubmit={handleAddQuestionSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Materi Utama</label>
                  <select
                    value={newQ.topic}
                    onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Ekosistem">Ekosistem</option>
                    <option value="Virus">Virus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtopik</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Daur Biogeokimia"
                    value={newQ.subtopic}
                    onChange={(e) => setNewQ({ ...newQ, subtopic: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Kesukaran</label>
                  <select
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sukar">Sukar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kalimat Soal / Pertanyaan *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Ketikkan teks soal di sini..."
                  value={newQ.question}
                  onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              {/* Opsi A - E */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Pilihan Jawaban (A - E)</label>
                {newQ.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center space-x-2">
                    <span className="font-bold text-slate-500 w-4">{String.fromCharCode(65 + oIdx)}.</span>
                    <input
                      type="text"
                      required
                      placeholder={`Pilihan ${String.fromCharCode(65 + oIdx)}...`}
                      value={opt}
                      onChange={(e) => {
                        const updatedOpts = [...newQ.options];
                        updatedOpts[oIdx] = e.target.value;
                        setNewQ({ ...newQ, options: updatedOpts });
                      }}
                      className="flex-1 p-2 rounded-xl border border-slate-300"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kunci Jawaban Benar</label>
                  <select
                    value={newQ.answer}
                    onChange={(e) => setNewQ({ ...newQ, answer: parseInt(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                    <option value={4}>E</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penjelasan / Pembahasan</label>
                  <input
                    type="text"
                    placeholder="Alasan kunci jawaban..."
                    value={newQ.explanation}
                    onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white font-bold shadow"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}