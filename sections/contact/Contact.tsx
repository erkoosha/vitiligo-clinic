import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { PHONES, ADDRESS, SOCIALS } from "@/lib/contacts"
import { SCHEDULE } from "@/lib/schedule"
import { PhoneIcon, WhatsAppIcon, InstagramIcon, MapPinIcon, ClockIcon } from "@/components/shared/icons"

const Contact = async () => {
  const t = await getTranslations("contact")
  const tf = await getTranslations("footer")

  const dayLabels: Record<string, string> = {
    mon: tf("days.mon"),
    tue: tf("days.tue"),
    wed: tf("days.wed"),
    thu: tf("days.thu"),
    fri: tf("days.fri"),
    sat: tf("days.sat"),
    sun: tf("days.sun"),
  }

  return (
    <section id="contact" className="bg-gray-50">

      {/* Map — full width */}
      <div className="w-full h-105 md:h-125">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d406.4629194679761!2d76.90421670740454!3d43.25449966644369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883690063869e2d%3A0xdc32e618fa13dd3f!2z0JDQudGC0LjQtdCy0LAgNDY!5e0!3m2!1sru!2skz!4v1776945620454!5m2!1sru!2skz"
          title="Карта клиники"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* CTA + Info */}
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: CTA */}
          <div className="md:col-span-3">
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">{t("label")}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{t("title")}</h2>
            <p className="text-gray-500 text-lg mb-10">{t("subtitle")}</p>

            {/* Phone rows */}
            <div className="flex flex-col gap-4 mb-8">
              {PHONES.map((phone) => (
                <div key={phone.number} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <PhoneIcon />
                  </div>
                  <a href={phone.href} className="text-gray-900 font-semibold text-lg hover:text-violet-600 transition-colors flex-1">
                    {phone.number}
                  </a>
                  <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white shrink-0" asChild>
                    <a href={phone.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                      <WhatsAppIcon />
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA button */}
            <Button className="h-13 px-8 rounded-2xl gap-3 text-base font-semibold" asChild>
              <a href={PHONES[0].whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t("whatsappCta")}
              </a>
            </Button>
          </div>

          {/* Right: Info cards */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
                <MapPinIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("address")}</p>
                <p className="text-gray-900 font-medium text-sm mb-1.5">{t("addressText")}</p>
                <a
                  href={ADDRESS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-violet-600 hover:text-violet-700 transition-colors"
                >
                  {t("mapLink")} →
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
                <InstagramIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{t("instagram")}</p>
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-medium text-sm hover:text-violet-600 transition-colors block"
                  >
                    {social.username}
                  </a>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 mt-0.5">
                <ClockIcon />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{tf("schedule")}</p>
                <div className="flex flex-col gap-1.5">
                  {SCHEDULE.map(({ dayKey, hours }) => (
                    <div key={dayKey} className="flex justify-between gap-4 text-xs">
                      <span className="text-gray-500">{dayLabels[dayKey]}</span>
                      {hours ? (
                        <span className="text-gray-900 font-medium tabular-nums">{hours}</span>
                      ) : (
                        <span className="text-gray-300">{tf("closed")}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
