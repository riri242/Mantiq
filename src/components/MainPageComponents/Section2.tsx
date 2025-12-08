import React from 'react'

export default function Cards() {
  return (
    <div>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center text-white mb-16">
        لماذا تختار منطق؟
      </h1>

      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-stretch">

        {/* Card 1 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-8 text-center h-full flex flex-col">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">فن كتابة الوثائق</h3>
          <p className="text-gray-200 text-base leading-relaxed">
            توثيق الأنظمة لا يجب أن يكون مملاً! تعلم كيف تكتب وثائق تترك انطباعاً قوياً
            وتساعدك في التواصل بشكل واضح وفعّال
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-8 text-center h-full flex flex-col">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17l-1.45-3.72L7 12l3.55-1.28L12 7l1.45 3.72L17 12l-3.55 1.28z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">ممارسات البرمجة الحديثة</h3>
          <p className="text-gray-200 text-base leading-relaxed">
            أكواد نظيفة، تصاميم مرنة، ونظم مستقرة – ستتعلم كيف تبني البرمجيات التي
            تعمل وتستمر
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-8 text-center h-full flex flex-col">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 5h16v10H4zM2 17h20v2H2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">إدارة المشاريع البرمجية</h3>
          <p className="text-gray-200 text-base leading-relaxed">
            تعلم كيف تنظم وتدير مشاريع البرمجيات بطرق مبتكرة تجعل فريقك يعمل بانسجام
            وكفاءة
          </p>
        </div>

      </div>
    </div>
  )
}
