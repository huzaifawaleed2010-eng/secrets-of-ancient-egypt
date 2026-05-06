// الانتظار حتى يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('englishInput');
    const resultContainer = document.getElementById('hieroResult');

    input.addEventListener('input', function() {
        // 1. تنظيف النص وتحويله لحروف صغيرة
        let text = this.value.toLowerCase().trim();
        
        // 2. مسح المحتوى القديم للخرطوش
        resultContainer.innerHTML = ''; 

        // 3. حالة الخرطوش الفاضي
        if (text.length === 0) {
            resultContainer.innerHTML = '<p class="placeholder-text"></p>';
            return;
        }

        // 4. الدوران على كل حرف كتبه المستخدم
        for (let char of text) {
            // التأكد أن الحرف إنجليزي فقط
            if (char >= 'a' && char <= 'z') {
                const img = document.createElement('img');
                
                // التأكد من مسار الصور: فولدر photo جواه فولدر hiero
                img.src = `photo/symbols/${char}.gif`; 
                img.className = 'hiero-char';
                img.alt = char;

                // معالجة الخطأ لو الصورة مش موجودة
                img.onerror = function() {
                    this.style.display = 'none';
                };

                resultContainer.appendChild(img);
            }
            // المسافات يتم تجاهلها داخل الخرطوش لأنه اسم علم
        }
    });
});