export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Премиальный сухой корм · Санкт-Петербург</p>
          <h1 className="hero__title">
            ЮМИ — премиальный сухой корм для собак в Санкт-Петербурге
          </h1>
          <p className="hero__sub">
            Рационы для ежедневного питания с понятной логикой подбора: по возрасту,
            размеру, активности и особенностям собаки.
          </p>
          <div className="hero__btns">
            <a href="#quiz" className="btn btn-primary">Подобрать корм</a>
            <a href="#lines" className="btn btn-outline">Смотреть будущие линейки</a>
          </div>
          <div className="hero__features">
            <span className="hero__feature">Подбор по весу и активности</span>
            <span className="hero__feature">Линейки для разных собак</span>
            <span className="hero__feature">Запуск в Санкт-Петербурге</span>
            <span className="hero__feature">Премиальная рецептура в разработке</span>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__circle hero__circle--1" />
          <div className="hero__circle hero__circle--2" />
          <div className="hero__package">
            <span className="hero__package-brand">ЮМИ</span>
            <span className="hero__package-sub">premium dog food</span>
          </div>
          <div className="hero__bowl" />
          <span className="hero__kibble" style={{ top: '18%', right: '22%' }} />
          <span className="hero__kibble" style={{ top: '72%', right: '18%', width: 6, height: 6 }} />
          <span className="hero__kibble" style={{ top: '65%', left: '28%', width: 5, height: 5 }} />
          <span className="hero__kibble" style={{ top: '30%', left: '15%', width: 7, height: 7 }} />
        </div>
      </div>
    </section>
  )
}
