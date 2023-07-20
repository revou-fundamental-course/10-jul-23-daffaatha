// pendeklarasian
const BMI_CATEGORIES = {
    Underweight: "Kekurangan berat badan",
    Ideal: "Normal (ideal)",
    Overweight: "Kelebihan berat badan",
    Obesity: "Kegemukan (Obesitas)"
}

// validasi inputan user
  , calculateBMI = (e,a)=>(e / (a / 100) ** 2).toFixed(1)
  , validateInput = (e,a,n,t)=>{
    const gn = document.getElementById("genderErrMessage")
      , wg = document.getElementById("weightErrMessage")
      , ag = document.getElementById("ageErrMessage")
      , hg = document.getElementById("heightErrMessage");
    document.querySelectorAll(".error-message").forEach((e=>e.innerText = ""));
    let u = !0;
    return "" !== t && ["laki-laki", "perempuan"].includes(t) || (gn.innerText = "Pilih jenis kelamin anda",
    u = !1),
    (isNaN(e) || e <= 0) && (wg.innerText = "Berat badan harus berupa angka lebih dari 0",
    u = !1),
    (isNaN(a) || a <= 0) && (ag.innerText = "Umur harus berupa angka lebih dari 0",
    u = !1),
    (isNaN(n) || n <= 0) && (hg.innerText = "Tinggi badan harus berupa angka lebih dari 0",
    u = !1),
    u
}

// pengecekan hasil inputan user
  , checkStatus = (e,a)=>{
    let n = "";
    switch (a) {
    case "laki-laki":
        e < 18.5 ? n = BMI_CATEGORIES.Underweight : e >= 18.5 && e <= 24.9 ? n = BMI_CATEGORIES.Ideal: e >= 25 && e <= 29.9 ? n = BMI_CATEGORIES.Overweight : e >= 30 && (n = BMI_CATEGORIES.Obesity);
        break;
    case "perempuan":
        e < 17 ? n = BMI_CATEGORIES.Underweight : e >= 17 && e <= 23.9 ? n = BMI_CATEGORIES.Ideal: e >= 23 && e <= 27 ? n = BMI_CATEGORIES.Overweight : e > 27 && (n = BMI_CATEGORIES.Obesity)
    }
    return n
}

// hasil inputan user
  , getDescText = e=>e === BMI_CATEGORIES.Underweight ? "Anda memiliki berat badan yang kurang dari normal." : 
  e === BMI_CATEGORIES.Ideal? "Anda memiliki berat badan dalam kisaran normal." : 
  e === BMI_CATEGORIES.Overweight ? "Anda memiliki berat badan yang berlebih." : 
  e === BMI_CATEGORIES.Obesity ? "Anda memiliki berat badan yang sangat berlebih." : void 0
  , getSuggestionText = e=>e === BMI_CATEGORIES.Underweight ? "Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menambah berat badan hingga batas normal." : 
  e === BMI_CATEGORIES.Ideal? "Jika BMI Anda berada dalam kategori ini maka Anda memiliki berat badan yang ideal. Petahankan pola makan dan waktu olahraga anda" : 
  e === BMI_CATEGORIES.Overweight ? "Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal." : 
  e === BMI_CATEGORIES.Obesity ? "Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk mengurangi berat badan hingga batas normal." : void 0
  , getAdviceText = e=>e === BMI_CATEGORIES.Underweight ? "Perbanyak asupan makanan bergizi dan konsultasikan dengan ahli gizi untuk peningkatan berat badan." : 
  e === BMI_CATEGORIES.Ideal? "Lanjutkan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur." : 
  e === BMI_CATEGORIES.Overweight? "Penyesuaian pola makan dan rutin berolahraga untuk menurunkan berat badan anda." : 
  e === BMI_CATEGORIES.Obesity? "Segera konsultasikan dengan ahli gizi untuk penurunan berat badan yang sehat." : void 0
  , getDiseases = e=>e === BMI_CATEGORIES.Underweight ? ["Kekurangan gizi, Sistem kekebalan tubuh lemah, Gangguan pertumbuhan"] : 
  e === BMI_CATEGORIES.Ideal ? ["Tidak ada"] : 
  e === BMI_CATEGORIES.Overweight? ["Diabetes, Kolesterol Tinggi, Osteoarthritis, Serangan Jantung, Kanker"] : 
  e === BMI_CATEGORIES.Obesity? ["Stroke, Kanker, Masalah Pencernaan, Diabetes Melitus, Penyakit Jantung, Hipertensi, Osteoartritis"] : void 0
  , generateDisplay = (e,a)=>{
    document.getElementById("result-title").innerText = a;
    document.getElementById("result-bmi").innerText = e;
    document.getElementById("result-desc").innerText = getDescText(a);
    document.getElementById("result-text").innerText = `Hasil BMI: ${e}`;
    document.getElementById("suggestion-text").innerText = getSuggestionText(a);
    document.getElementById("advice-text").innerText = getAdviceText(a);
    document.getElementById("risk-title").innerText = `Beberapa penyakit yang akan timbul dari tubuh ${a}`;
    const n = document.getElementById("list-risk");
    n.innerHTML = "";
    getDiseases(a).forEach((e=>{
        const a = document.createElement("li");
        a.innerText = e,
        n.appendChild(a)
    }
    )),
    document.getElementById("form").reset(),
    document.getElementById("result").classList.remove("d-hidden"),
    document.getElementById("home").classList.add("d-hidden")
}
  , checkBMI = ()=>{
    const e = +document.getElementById("weight").value
      , a = +document.getElementById("height").value
      , n = document.querySelector('input[name="gender"]:checked').value
      , t = +document.getElementById("age").value;
    if (!validateInput(e, a, t, n))
        return;
    const i = calculateBMI(e, a)
      , r = checkStatus(i, n);
    generateDisplay(i, r),
    document.getElementById("result").scrollIntoView({
        behavior: "smooth"
    })
}
  , regenerateBMI = ()=>{
    document.getElementById("home").classList.remove("d-hidden"),
    document.getElementById("result").classList.add("d-hidden"),
    document.getElementById("form").scrollIntoView({
        behavior: "smooth"
    })
}
;