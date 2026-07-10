import {
  getPickupMapEmbedUrl,
  getPickupMapsLink,
  PICKUP_POINT,
} from '@/src/lib/availability'

const TAGS = [
  'Санкт-Петербург',
  'Курьерская доставка',
  'Самовывоз по согласованию',
  'Оплата при получении',
]

export function Delivery() {
  return (
    <section className="section delivery" id="delivery">
      <div className="container delivery__inner">
        <div>
          <p className="eyebrow">Доставка</p>
          <h2>Доставка по Санкт-Петербургу</h2>
          <p className="delivery__text">
            Доставим лакомства по Санкт-Петербургу курьером внутри КАД и за КАД.
            Самовывоз — по согласованию с точки на карте. Оплата при получении,
            без онлайн-оплаты на сайте.
          </p>
          <div className="delivery__pickup">
            <p className="delivery__pickup-title">{PICKUP_POINT.label}</p>
            <p className="delivery__pickup-meta">
              {PICKUP_POINT.city} · {PICKUP_POINT.hint}
            </p>
            <a
              href={getPickupMapsLink()}
              className="delivery__pickup-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть в Яндекс Картах →
            </a>
          </div>
          <div className="delivery__tags">
            {TAGS.map((tag) => (
              <span key={tag} className="delivery__tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="delivery__map">
          <iframe
            title="Точка самовывоза ЮМИ"
            src={getPickupMapEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
