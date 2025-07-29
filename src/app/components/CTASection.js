import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

function CTASection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 sm:bottom-32 right-8 sm:right-16 w-40 h-40 sm:w-80 sm:h-80 bg-violet-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
          Siap Memulai <span className="text-violet-400">Journey</span>
          <br />
          <span className="text-violet-400">Publishing</span> Anda?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          Jangan biarkan ide brilian Anda hanya menjadi impian. Mari wujudkan
          menjadi karya nyata yang dapat menginspirasi dan mengubah dunia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
          <button className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 text-white rounded-xl lg:rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Konsultasi Gratis Sekarang</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Contact Quick Access */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
              WhatsApp
            </h4>
            <p className="text-slate-300 text-sm sm:text-lg">
              +62 812-3456-7890
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2">
              Respons dalam 5 menit
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
              Email
            </h4>
            <p className="text-slate-300 text-sm sm:text-lg">
              info@apace.co.id
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2">
              Respons dalam 1 jam
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg">
              Office
            </h4>
            <p className="text-slate-300 text-sm sm:text-lg">Jakarta Selatan</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2">
              Senin - Jumat, 09:00-17:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
