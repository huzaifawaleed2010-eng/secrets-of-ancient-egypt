// مصفوفة المعلومات الطويلة
const mysteryData = [
    { 
        cat: "أسرار طبية (التحنيط)", 
        icon: "fa-staff-snake", 
        text: "لم يكن التحنيط مجرد طقس ديني، بل كان علماً طبياً متقدماً جداً. كان المحنطون يعرفون أماكن الأعضاء بدقة مذهلة، حيث يتم استخراج الأحشاء عبر فتحة صغيرة جداً في الجانب الأيسر. المثير للدهشة هو استخدامهم لملح النطرون لتجفيف الجسد تماماً من السوائل لمنع التعفن، ثم صب الراتنجات الصمغية والزيوت العطرية التي تمتلك خصائص مضادة للبكتيريا، مما جعل المومياوات تصمد لآلاف السنين دون تحلل، وهو ما يعجز العلم الحديث عن محاكاته بنفس الجودة." 
    },
    { 
        cat: "أسرار هندسية (الهرم الأكبر)", 
        icon: "fa-compass-drafting", 
        text: "الهرم الأكبر ليس مجرد بناء حجري، بل هو معجزة حسابية؛ فلو ضربت ارتفاعه في مليار، ستحصل على المسافة بين الأرض والشمس تقريباً. الحجارة التي يصل وزن بعضها إلى 50 طناً تم قطعها ونقلها من أسوان إلى الجيزة، ووضعت بدقة لا تسمح بمرور شفرة حلاقة بين الحجر والآخر. العلماء اكتشفوا أن الهرم يعمل كـ 'مكثف طاقة' طبيعي، حيث تتجمع الموجات الكهرومغناطيسية داخل غرفه، مما يطرح تساؤلات حول الغرض الحقيقي من بنائه وهل كان مجرد مقبرة أم شيئاً أعظم؟" 
    },
    { 
        cat: "أسرار كيميائية (الألوان)", 
        icon: "fa-flask", 
        text: "اشتهر المصريون بصناعة 'الأزرق المصري'، وهو أول لون اصطناعي في تاريخ البشرية. لم يكن مجرد صبغة، بل مركب كيميائي معقد يتم إنتاجه بتسخين خليط من الكالسيوم والنحاس والسيليكا عند درجة حرارة تصل إلى 900 درجة مئوية. هذا اللون يمتلك خاصية فيزيائية نادرة، حيث يصدر أشعة تحت حمراء عند تسليط الضوء عليه، مما يساعد العلماء حالياً في كشف تزوير اللوحات والآثار. بقاء هذه الألوان زاهية رغم مرور 4000 عام من الرطوبة والشمس يظل لغزاً كيميائياً محيراً." 
    },
    { 
        cat: "أسرار فلكية (أبو سمبل)", 
        icon: "fa-sun", 
        text: "داخل معبد أبو سمبل، تتجلى عبقرية الفلك والهندسة في ظاهرة 'تعامد الشمس'. فمرتين كل عام، في يوم ميلاد الملك رمسيس الثاني ويوم تتويجه، تدخل أشعة الشمس من باب المعبد الضيق لتخترق مسافة 60 متراً في الظلام الدامس، وتستقر بدقة متناهية على وجه تمثال الملك فقط. هذه الحسابات الفلكية المعقدة تطلبت معرفة تامة بحركة الأجرام السماوية وميل محور الأرض، وتم تصميم المعبد بحيث تظل بقية التماثيل في الظل، مما يثبت أنهم كانوا ملوك الأرض والسماء معاً." 
    }
];

let mysteryIndex = 0;
let mysteryTimer;

function updateMysteryUI() {
    const content = document.getElementById('info-content');
    const item = mysteryData[mysteryIndex];

    // إعادة تشغيل الأنيميشن
    content.classList.remove('fade-in');
    void content.offsetWidth; 
    content.classList.add('fade-in');

    // تحديث النصوص والأيقونات
    document.getElementById('info-icon').className = `fas ${item.icon}`;
    document.getElementById('info-category').innerText = item.cat;
    document.getElementById('info-text').innerText = item.text;

    // تحديث النقاط (Dots)
    updateMysteryDots();
}

function changeSlide(n) {
    mysteryIndex += n;
    
    // الدائرة المغلقة
    if (mysteryIndex >= mysteryData.length) mysteryIndex = 0;
    if (mysteryIndex < 0) mysteryIndex = mysteryData.length - 1;

    updateMysteryUI();
    startMysteryTimer(); // ريست للعداد
}

function startMysteryTimer() {
    clearInterval(mysteryTimer);
    mysteryTimer = setInterval(() => changeSlide(1), 15000); // 15 ثواني للقراءة
}

function createDots() {
    const wrapper = document.getElementById('dots-wrapper');
    mysteryData.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => { mysteryIndex = i; updateMysteryUI(); startMysteryTimer(); };
        wrapper.appendChild(dot);
    });
}

function updateMysteryDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === mysteryIndex);
    });
}

// البدء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    updateMysteryUI();
    startMysteryTimer();
});

const counters = document.querySelectorAll('.stat-number');

// الدالة اللي هتشغل العد لكل رقم بشكل مستقل
const startPreciseCounter = (counter) => {
    // 1. نجيب الرقم النهائي من النص ونشيل منه الفواصل
    const target = +counter.innerText.replace(/,/g, '');
    
    // 2. نحدد سرعة الزيادة بناءً على حجم الرقم (عشان الملايين متقعدش سنة تعد)
    // لو الرقم أكبر من 100,000 هيزيد بـ 5000 في كل تكة، لو أصغر هيزيد بـ 1
    let increment = target > 100000 ? Math.ceil(target / 200) : Math.ceil(target / 100);
    
    let current = 0;

    const update = () => {
        current += increment;

        if (current < target) {
            counter.innerText = Math.ceil(current).toLocaleString();
            // سرعة التحديث (10 ملي ثانية) لضمان نعومة الحركة
            setTimeout(update, 10);
        } else {
            // التأكد من كتابة الرقم النهائي بالظبط في الآخر
            counter.innerText = target.toLocaleString();
        }
    };

    update();
};

// تشغيل العداد لما اليوزر يوصل للقسم
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startPreciseCounter(entry.target);
            observer.unobserve(entry.target); // يشتغل مرة واحدة بس
        }
    });
}, { threshold: 1.0 });

counters.forEach(counter => observer.observe(counter));

const observerOptions = {
    threshold: 0.2
};

const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // بنضيف كلاس "show" لكل الكروت بفرق زمني بسيط
            const cards = entry.target.querySelectorAll('.why-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200); // فرق 200 ملي ثانية بين كل كارت
            });
            whyObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

whyObserver.observe(document.querySelector('.why-us-grid'));

document.querySelector('.scroll-down a').addEventListener('click', function(e) {
    e.preventDefault(); // بيمنع الحركة المفاجئة
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
});
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    
    // هنستنى ثانيتين عشان الميس تلحق تشوف العظمة
    setTimeout(() => {
        splash.classList.add('hide-splash');
    }, 1000); 
});

const hb = document.getElementById('hamburger-btn');
const menu = document.getElementById('nav-menu');

hb.onclick = function() {
    hb.classList.toggle('active');
    menu.classList.toggle('active');
}