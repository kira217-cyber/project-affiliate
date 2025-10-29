import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "নিরাপদ এবং বিশ্বস্ত",
      desc: "আমাদের হাই-প্রোটেকটেড ব্যাংকিং সিস্টেমের সাথে, আপনার সমস্ত লেনদেনের জন্য রয়েছে সর্বোচ্চ নিরাপত্তা।",
      img: "https://cdn-icons-png.flaticon.com/512/929/929416.png",
    },
    {
      id: 2,
      title: "সেরা কমিশনের হার",
      desc: "আমরা কমপক্ষে ৪০% সহ সেরা অ্যাফিলিয়েট কমিশন রেট অফার করি, যা ৫০% পর্যন্ত হতে পারে!",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      id: 3,
      title: "প্রম্পট পেআউট, কোনো অতিরিক্ত চার্জ নেই",
      desc: "আমরা সময়মতো পেমেন্ট নিশ্চিতে প্রতিশ্রুতিবদ্ধ, কোনো হিডেন চার্জ নেই।",
      img: "https://cdn-icons-png.flaticon.com/512/992/992703.png",
    },
    {
      id: 4,
      title: "মহান খেলা বৈচিত্র্য",
      desc: "RAJABAJI লাইভ ক্যাসিনো, স্লট, প্ল্যাটফর্ম এবং ফিশিংসহ ১০০০+ গেম সরবরাহ করে।",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 5,
      title: "সম্পূর্ণ ডিভাইসে উপভোগ্য",
      desc: "আমাদের প্ল্যাটফর্ম ডেস্কটপ, ট্যাবলেট এবং মোবাইল ডিভাইসের জন্য সম্পূর্ণরূপে অপ্টিমাইজ করা।",
      img: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    },
    {
      id: 6,
      title: "খেলোয়াড়দের জন্য সেরা মূল্য",
      desc: "আমরা সর্বদা খেলোয়াড়দের জন্য সেরা বোনাস ও অফার প্রদান করি।",
      img: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  ];

  return (
    <div id="why-us"
      className="relative bg-fixed bg-center bg-cover py-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          কেন আমাদের?
        </motion.h2>
        <motion.p
          className="text-white text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          RAJABAJI সেরা অধিভুক্ত সহযোগিতা এবং সুবিশেষ গ্যারান্টি দেয়!
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-black/60 border border-primary/30 backdrop-blur-lg rounded-2xl p-6 text-white hover:border-primary hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-500"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h3 className="text-primary text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
