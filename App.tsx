
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowDown, MapPin, Clock, Briefcase, 
  Users, Heart, Calendar, Award, BookOpen, Camera, 
  Mic, Mail, History, ChevronRight, ChevronDown, 
  Quote, Shield, Building2, Globe, Scale, CheckCircle2, AlertCircle
} from 'lucide-react';

// --- Constants ---
// High-quality pink flamingo image as requested for the logo.
const LOGO_URL = "https://images.unsplash.com/photo-1549413280-48f869911e86?auto=format&fit=crop&w=800&q=80"; 

// --- Components ---

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };
    animateTrail();
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ left: position.x, top: position.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})` }}
      />
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-gold/40 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{ left: trail.x, top: trail.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`, opacity: isHovering ? 0.8 : 0.4 }}
      />
    </>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Biography', id: 'story' },
    { name: 'Legacy', id: 'legacy' },
    { name: 'Institution', id: 'institution' },
    { name: 'Timeline', id: 'timeline' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative overflow-hidden rounded-full border border-gold/40 shadow-[0_0_15px_rgba(242,140,174,0.4)]">
            <img 
              src={LOGO_URL} 
              alt="Sahra Ali Hersi Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="cinzel text-lg tracking-widest text-gold font-bold hidden sm:block">SAHRA ALI HERSI / MAMA HERSI</span>
        </div>

        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="text-xs font-medium tracking-widest uppercase hover:text-gold transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <button className="lg:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-black/95 absolute w-full left-0 py-8 border-b border-gold/20 flex flex-col items-center gap-6 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)} className="text-lg font-medium tracking-widest uppercase hover:text-gold transition-colors">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x = Math.random() * canvas!.width;
      y = canvas!.height + Math.random() * 100;
      size = Math.random() * 2 + 0.5;
      speed = Math.random() * 1 + 0.5;
      opacity = Math.random() * 0.5 + 0.2;
      color = Math.random() > 0.5 ? '#D4AF37' : '#F28CAE';

      update() {
        this.y -= this.speed;
        if (this.y < -10) {
          this.y = canvas!.height + 10;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        ctx!.globalAlpha = this.opacity;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />
      <div className="container mx-auto px-6 text-center z-10">
        <div className="mb-12 inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F28CAE]/30 to-gold/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <img 
              src={LOGO_URL} 
              alt="Sahra Ali Hersi Matriarchal Heritage Logo" 
              className="w-full h-full object-cover rounded-full border-4 border-gold shadow-[0_20px_60px_rgba(212,175,55,0.5)] relative z-10 hover:scale-105 transition-transform duration-700 cursor-pointer" 
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 px-8 py-3 border border-gold/40 rounded-full z-20 shadow-xl">
              <span className="cinzel text-sm text-gold font-bold tracking-[0.2em]">MATRIARCH</span>
            </div>
          </div>
        </div>
        <h1 className="cinzel text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white animate-fade-in">
          <span className="text-gold">SAHRA ALI HERSI</span> <br /> MAMA HERSI
        </h1>
        <p className="cinzel text-xl md:text-2xl text-gold font-semibold tracking-[0.1em] mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          THE ROOT OF THE LEGACY. THE HEART OF THE WORK.
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light italic animate-fade-in" style={{ animationDelay: '0.7s' }}>
          "From Bungoma to East Africa: A story of vision, courage, and entrepreneurship. Honoring the life of the Iron Lady and the foundation of a dynasty."
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <a href="#story" className="px-10 py-4 bg-gold text-black font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold/20">
            Explore Heritage
          </a>
          <a href="#institution" className="px-10 py-4 border border-gold text-gold font-bold tracking-widest uppercase hover:bg-gold/10 transition-all duration-300 transform hover:-translate-y-1">
            The Institution
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold cursor-pointer">
        <ArrowDown size={32} />
      </div>
    </section>
  );
};

const Biography: React.FC = () => {
  const chapters = [
    {
      title: "Roots & Formation",
      year: "Pre-1958",
      content: "The origin story establishes the foundational values of the Hersi name. Her early upbringing and influences shaped the woman who would become a queen of commerce, instilling the courage needed for the journeys ahead.",
      highlight: "Establishing origin story and foundational values.",
      img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Pioneer Arrives",
      year: "1958 Migration",
      content: "The pivotal move from Nakuru to Bungoma. In a quiet outpost, Sahra Ali Hersi saw potential where others saw distance, demonstrating the vision to see opportunity in a frontier town.",
      highlight: "The courage to move and vision to build.",
      img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Building New Nyanza",
      year: "1960s - 1980s",
      content: "Establishing New Nyanza Wholesalers and securing a crucial Bamburi Cement agency. This period defined her as the 'Iron Lady' of hardware and commodities, becoming essential to regional growth.",
      highlight: "Institutionalizing trade and construction.",
      img: "https://images.unsplash.com/photo-1503387762-592dea58ed23?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Iron Matriarch",
      year: "Widowhood & Resilience",
      content: "Losing her husband when daughter Amina was only nine, Sahra became the sole provider for six children. Her resilience in the face of tragedy became the bedrock of the family's strength.",
      highlight: "Sole provider for six, building strength from tragedy.",
      img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Mentor & Architect",
      year: "Training the Generation",
      content: "Sahra was the family's first business school. She taught her daughters accounting and business management on the shop floor, taking them on cross-border routes to master regional trade.",
      highlight: "The first business school was the family shop.",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Cross-Border Vision",
      year: "Regional Expansion",
      content: "Strategic thinking beyond borders. She encouraged daughter Amina's expansion into Uganda after loss, recognizing that a change of environment would facilitate healing and unprecedented growth.",
      highlight: "Strategic expansion across national borders.",
      img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Daily Discipline",
      year: "Present Day at the Helm",
      content: "Despite health challenges, she is at the helm of New Nyanza every day. She proves that retirement is a concept for those without a mission. Purpose is her medicine.",
      highlight: "Work is purpose, not obligation.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Fruit of the Legacy",
      year: "Generational Impact",
      content: "Her teachings manifested through Amina's Uganda empire, Asha's foundation, and the success of the extended family. The seed planted in Bungoma has grown into a pan-African forest.",
      highlight: "A legacy of entrepreneurs and community leaders.",
      img: "https://images.unsplash.com/photo-1531123897727-8f129e16f8ec?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="story" className="py-24 bg-neutral-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="cinzel text-4xl text-gold mb-4 uppercase tracking-widest">The Matriarch's Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic">Eight chapters that defined a queen, built an empire, and created a legacy that spans generations.</p>
        </div>
        <div className="space-y-24">
          {chapters.map((ch, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-neutral-800 border-2 border-gold/10 relative overflow-hidden group">
                  <img 
                    src={ch.img} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
                    alt={ch.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-6 left-6 cinzel text-4xl font-bold text-gold/30">{idx + 1}</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-flamingo font-bold tracking-[0.2em] text-xs uppercase mb-2 block">{ch.year}</span>
                <h3 className="cinzel text-2xl text-gold mb-4 uppercase tracking-wider">{ch.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">{ch.content}</p>
                <div className="p-4 border-l-4 border-flamingo bg-flamingo/5 italic text-flamingo">
                  {ch.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LivingLegacy: React.FC = () => {
  return (
    <section id="legacy" className="py-24 bg-black border-y border-gold/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="cinzel text-4xl text-gold mb-6 uppercase tracking-widest">A Constellation of Callings</h2>
          <p className="text-gray-400 italic max-w-4xl mx-auto text-lg leading-relaxed">
            "The legacy of Mama Hersi and the New Nyanza household was not a singular path but a constellation of callings. Built on a foundation of integrity, discipline, and entrepreneurial grit, her values found unique expression in the lives of her children. Together, they expanded the family's influence from the heart of Bungoma into the halls of government, the boardrooms of industry, and the fabric of community—each embodying a vital pillar of a remarkable heritage."
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-neutral-900/40 p-10 border border-gold/10 hover:border-gold transition-all group relative">
             <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
              <Scale size={80} />
            </div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <Shield className="text-flamingo" size={40} />
              <h3 className="cinzel text-2xl text-gold">I. The Statesman: Adan Hersi</h3>
            </div>
            <h4 className="cinzel text-sm text-flamingo mb-4 tracking-widest uppercase">A Legacy of Public Service and Leadership</h4>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Serving in government, Adan carried forward the family’s deeply rooted values into the sphere of public service. His work represents the Diplomatic Pillar—demonstrating how principles shaped at New Nyanza apply to national leadership.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-10 border border-gold/10 hover:border-gold transition-all group relative">
            <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
              <Building2 size={80} />
            </div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <Globe className="text-flamingo" size={40} />
              <h3 className="cinzel text-2xl text-gold">II. The Industrialist: Amina Hersi Moghe</h3>
            </div>
            <h4 className="cinzel text-sm text-flamingo mb-4 tracking-widest uppercase">Scaling the Spirit of New Nyanza</h4>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Amina transformed the entrepreneurial foundation laid in Bungoma into one of East Africa’s success stories. Her journey across regional borders reflects resilience and strategic vision.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-10 border border-gold/10 hover:border-gold transition-all group relative">
            <div className="absolute top-4 right-4 text-gold/10 group-hover:text-gold/20 transition-colors">
              <Heart size={80} />
            </div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <Award className="text-flamingo" size={40} />
              <h3 className="cinzel text-2xl text-gold">III. The Philanthropist: Asha Hersi</h3>
            </div>
            <h4 className="cinzel text-sm text-flamingo mb-4 tracking-widest uppercase">The Guardian of Home and Community</h4>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Asha represents the humanitarian heart. Through the Asha Hersi Foundation, she focuses on supporting vulnerable individuals, anchoring family success firmly to service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Institution: React.FC = () => {
  return (
    <section id="institution" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="w-full md:w-1/2">
            <h2 className="cinzel text-3xl text-gold mb-6 uppercase tracking-widest">New Nyanza: The Institution</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              More than a business, New Nyanza Wholesalers Ltd is a living monument to discipline, continuity, and matriarchal leadership. Founded by Sahra Ali Hersi, it has been a cornerstone of Bungoma's economy for decades.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-neutral-900 border border-gold/5">
                <MapPin className="text-flamingo mb-2" />
                <h4 className="cinzel text-gold text-sm mb-1">Location</h4>
                <p className="text-gray-300 text-sm">Cheptais, Moi Ave, Bungoma, Kenya</p>
              </div>
              <div className="p-6 bg-neutral-900 border border-gold/5">
                <Building2 className="text-flamingo mb-2" />
                <h4 className="cinzel text-gold text-sm mb-1">Entity</h4>
                <p className="text-gray-300 text-sm">New Nyanza Wholesalers Ltd</p>
              </div>
            </div>

            <div className="bg-neutral-900 p-1 border border-gold/20 h-[300px] relative overflow-hidden rounded">
               <iframe 
                title="Bungoma Town Center Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.03457161614!2d34.550571!3d-0.563507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178129219089989b%3A0x6a0c0e7b9b9b9b9b!2sBungoma%2C+Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) opacity(0.8)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <div className="bg-neutral-900 p-8 border border-gold/20 rounded">
              <h3 className="cinzel text-xl text-gold mb-6 border-b border-gold/20 pb-4">Business Hours</h3>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "8am - 5pm" },
                  { day: "Tuesday", hours: "8am - 5pm" },
                  { day: "Wednesday", hours: "8am - 5pm" },
                  { day: "Thursday", hours: "8am - 5pm" },
                  { day: "Friday", hours: "8am - 5pm" },
                  { day: "Saturday", hours: "8am - 12pm" },
                  { day: "Sunday", hours: "Closed" },
                ].map((d, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 font-medium">{d.day}</span>
                    <span className={`${d.hours === 'Closed' ? 'text-flamingo' : 'text-gold'} font-bold`}>{d.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gold/20 flex items-center justify-between">
                <span className="text-xs text-flamingo font-bold uppercase animate-pulse">At The Helm</span>
                <span className="text-xs text-gray-500 cinzel tracking-widest uppercase text-right">A Legacy in Motion</span>
              </div>
            </div>
            
            <div className="p-8 border-l-4 border-gold bg-gold/5 rounded">
              <Quote className="text-gold mb-4" />
              <p className="text-gray-300 italic text-lg leading-relaxed">
                "She is not a memory. She is not retired. She is present. She is New Nyanza."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineSection: React.FC = () => {
  const events = [
    { year: "1958", title: "THE PIONEER ARRIVES", desc: "Migration from Nakuru to Bungoma outpost. Vision takes root." },
    { year: "1960s", title: "BUILDING FOUNDATIONS", desc: "New Nyanza established. Becomes major agent for Bamburi Cement." },
    { year: "1970s", title: "CROSS-BORDER TRADE", desc: "Strategic networks develop between Kenya and Uganda." },
    { year: "1980s", title: "THE IRON MATRIARCH", desc: "Sole provider for 6 children. Extraordinary strength in tragedy." },
    { year: "1996", title: "UGANDA EXPANSION", desc: "Strategic move to Kampala, transforming grief into opportunity." },
    { year: "2010s", title: "SKYLINE TRANSFORMATION", desc: "Landmark developments reshaped East African infrastructure." },
    { year: "TODAY", title: "STILL AT THE HELM", desc: "Daily presence at New Nyanza. A living archive." }
  ];

  return (
    <section id="timeline" className="py-24 bg-black overflow-hidden border-t border-gold/10">
      <div className="container mx-auto px-6">
        <h2 className="cinzel text-4xl text-gold mb-20 text-center uppercase tracking-widest">Interactive Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-flamingo to-gold hidden md:block" />
          <div className="space-y-16">
            {events.map((ev, i) => (
              <div 
                key={i} 
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end px-4">
                  <div className={`text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} group bg-neutral-900/40 p-6 border border-white/5 rounded-lg w-full max-w-sm hover:border-gold/30 transition-all`}>
                    <span className="cinzel text-3xl font-bold text-gold mb-2 block">{ev.year}</span>
                    <h3 className="cinzel text-xl text-white mb-3 group-hover:text-flamingo transition-colors">{ev.title}</h3>
                    <p className="text-gray-400 text-sm">{ev.desc}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gold border-4 border-black z-10 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gold animate-ping rounded-full opacity-20" />
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <div className="md:w-1/2 px-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="cinzel text-4xl text-gold mb-6 uppercase">Preserve the Legacy</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              This is a living archive. We welcome contributions from family, friends, and community members who have been touched by Mama Hersi's story.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gold/80">
                <MapPin className="text-flamingo" />
                <span>Cheptais, Moi Ave, Bungoma, Kenya</span>
              </div>
              <div className="flex items-center gap-4 text-gold/80">
                <Mail className="text-flamingo" />
                <span>archive@hersi-legacy.com</span>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 p-8 border border-gold/20 rounded">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full bg-black border border-gold/20 p-4 rounded text-white focus:border-gold outline-none" />
                <input type="email" placeholder="Email" className="w-full bg-black border border-gold/20 p-4 rounded text-white focus:border-gold outline-none" />
              </div>
              <textarea placeholder="Share your memory or tribute" rows={5} className="w-full bg-black border border-gold/20 p-4 rounded text-white focus:border-gold outline-none resize-none"></textarea>
              <button type="button" className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-gold/10">Submit Contribution</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-stone-200 selection:bg-gold selection:text-black font-sans">
      <CustomCursor />
      <div className="fixed top-0 left-0 w-full h-1 bg-gold/5 z-[60]">
        <div 
          className="h-full bg-gold shadow-[0_0_15px_rgba(212,175,55,1)] transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Biography />
        <LivingLegacy />
        <Institution />
        <TimelineSection />
        <Contact />
      </main>
      <footer className="py-12 border-t border-gold/20 bg-black text-center">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-10 h-10 relative overflow-hidden rounded-full border border-gold/20">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="cinzel text-gold text-sm tracking-widest font-bold">THE ROOT OF THE LEGACY. THE HEART OF THE WORK.</span>
           </div>
           <p className="text-xs text-gray-500 tracking-widest uppercase">© 2025 Sahra Ali Hersi Archive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
