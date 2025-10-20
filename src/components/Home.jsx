//srcs/Home.jsx
import React from "react";
import Header from "./Header";
import "../styles/Home.css";

/**
 * Replace these image imports/paths with your actual assets.
 * Example: import FatherAngelos from "../assets/images/angelos.jpg";
 */
const CLERGY = [
  {
    role: "Father",
    name: "Abune Mathias",
    img: "/src/assets/images/image1.png",
    points: [
      "Abuna (or Abune, which is the status constructus form used when a name follows: Ge'ez አቡነ abuna/abune, 'our father'; Amharic and Tigrinya) is the honorific title used for any bishop of the Ethiopian Orthodox Tewahedo Church as well as of the Eritrean Orthodox Tewahedo Church. It was historically used solely for the head of the Coptic Orthodox Church in Ethiopia during the more than 1000 years when the Coptic Patriarchate of Alexandria appointed only one bishop at a time to serve its Ethiopian flock. When referred to without a name following, it is Abun, and if a name follows, it becomes Abuna (e.g., Abuna Paulos).",
    ],
    actions: [
      { label: "READ MORE >>", href: "#angelos-more" },
      { label: "CONFESSIONS >>", href: "#angelos-confessions" },
    ],
  },
  {
    role: "Father",
    name: "Abune Paulos",
    img:"/src/assets/images/image2.png",
    points: [
      "Abune Paulos (born Gebremedhin Woldeyohannes; 3 November 1936 – 16 August 2012)[1] was the fifth Patriarch of the Ethiopian Orthodox Tewahedo Church from 1992 to his death in 2012. His full title was His Holiness Abuna Paulos, Fifth Patriarch of the Orthodox Tewahido Church of Ethiopia, Ichege of the see of Saint Tekle Haymanot, Archbishop of Axum and one of the seven serving Presidents of the World Council of Churches.",
    ],
    actions: [
      { label: "READ MORE >>", href: "#youssef-more" },
      { label: "CONFESSIONS >>", href: "#youssef-confessions" },
    ],
  },
  {
    role: "Father",
    name: "Abuna Theophilos ",
    img: "/src/assets/images/image3.png",
    points: [
      "Abuna Theophilos (24 April 1910 – 14 August 1979), also known as Abune Tewophilos, was the second Patriarch of the Ethiopian Orthodox Tewahedo Church. He officially succeeded Abuna Basilios in 1971 after he had assumed the role of acting patriarch upon Abuna Basilios's death in 1970.[1][2][3] - and through dedicated service to his church he ultimately became a martyr for his faith.",
      "We pray that the Lord will continue blessing his service.",
    ],
    actions: [
      { label: "READ MORE >>", href: "#moses-more" },
      { label: "CONFESSIONS >>", href: "#moses-confessions" },
    ],
  },
];

export default function Home() {
  return (
    <div className="ht-body">
      <Header />

      {/* HERO */}
  <section id="home" className="ht-hero">
  <div className="ht-hero-overlay" />
  <div className="ht-container ht-hero-inner">
    <h1 className="ht-hero-title">Holy Trinity Ethiopian</h1>
    <h2 className="ht-hero-subtitle">Orthodox Tewahedo Church</h2>
    <p className="ht-hero-text">
      A sacred community rooted in ancient traditions, united in faith, and
      committed to spiritual growth and service.
    </p>
    <div className="ht-hero-actions">
      <a className="ht-btn ht-btn-gold" href="#visit">Join Us for Worship</a>
      <a className="ht-btn ht-btn-ghost" href="#learn">Learn More</a>
    </div>
  </div>
  <div className="ht-hero-fade" />
</section>


      {/* ABOUT / FOUR PILLARS */}
      <section className="ht-section">
        <div className="ht-container">
          <h3 className="ht-h3">About Our Church</h3>
          <p className="ht-lead">
            Holy Trinity Ethiopian Orthodox Tewahedo Church is a vibrant spiritual
            community dedicated to preserving our ancient faith while serving our
            modern world. We welcome all who seek to grow in their relationship
            with God through the rich traditions of Ethiopian Orthodoxy.
          </p>

          <div className="ht-grid ht-grid-4">
            <div className="ht-card">
              <div className="ht-icon-ring">⌂</div>
              <h4 className="ht-card-title">Sacred Tradition</h4>
              <p className="ht-card-text">
                Preserving over 1,600 years of Ethiopian Orthodox Tewahedo Church
                tradition and liturgy.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">❤</div>
              <h4 className="ht-card-title">Community Love</h4>
              <p className="ht-card-text">
                Building a loving, supportive community that cares for one
                another in Christ’s name.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">👥</div>
              <h4 className="ht-card-title">Fellowship</h4>
              <p className="ht-card-text">
                Bringing together families and individuals in worship, service,
                and spiritual growth.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">📖</div>
              <h4 className="ht-card-title">Teaching</h4>
              <p className="ht-card-text">
                Providing biblical education and spiritual guidance for all ages
                and backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BLUE */}
      <section id="visit" className="ht-cta ht-cta-blue">
        <div className="ht-container ht-cta-inner">
          <h3>Join Our Sacred Community</h3>
          <p>
            Whether you're seeking spiritual guidance, community fellowship, or a deeper
            understanding of Ethiopian Orthodox traditions, we invite you to be part of our family.
          </p>
          <a className="ht-btn ht-btn-gold" href="#contact">Visit Us This Sunday</a>
        </div>
      </section>

      {/* OUR SPIRITUAL LEADERS — DARK CARDS LIKE YOUR SCREENSHOT */}
      <section id="clergy" className="leaders-dark">
        <div className="ht-container">
          <h3 className="leaders-title">Our Spiritual Leaders</h3>
          <p className="leaders-lead">
            Meet the dedicated clergy who guide our church community with wisdom, devotion, and
            unwavering faith in the Orthodox tradition.
          </p>

          <div className="leaders-grid">
            {CLERGY.map((p, i) => (
              <article key={i} className="leader-card">
                <div className="leader-img">
                  <img src={p.img} alt={p.name} />
                </div>

                <div className="leader-body">
                  <p className="leader-role">{p.role}</p>
                  <h4 className="leader-name">{p.name}</h4>

                  <div className="leader-text">
                    {p.points.map((t, ix) => (
                      <p key={ix}>{t}</p>
                    ))}
                  </div>

                  <div className="leader-actions">
                    {p.actions.map((a, j) => (
                      <a key={j} className="leader-btn" href={a.href}>{a.label}</a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MINISTRIES */}
      <section id="ministries" className="ht-section">
        <div className="ht-container">
          <h3 className="ht-h3">Our Ministries</h3>
          <p className="ht-lead">
            Discover opportunities to grow in faith, serve others, and build lasting
            relationships within our church community through our various ministry programs.
          </p>

          <div className="ht-grid ht-grid-2">
            <div className="ht-card lg">
              <div className="ht-card-head">
                <div className="ht-icon-ring">👥</div>
                <h4 className="ht-card-title">Youth Ministry</h4>
              </div>
              <p className="ht-card-text">
                Empowering the next generation through faith-based education, fellowship, and community service.
              </p>
              <span className="ht-chip">Sundays after service</span>
            </div>

            <div className="ht-card lg">
              <div className="ht-card-head">
                <div className="ht-icon-ring">🎓</div>
                <h4 className="ht-card-title">Sunday School</h4>
              </div>
              <p className="ht-card-text">
                Biblical education for all ages, teaching the foundations of Ethiopian Orthodox faith and traditions.
              </p>
              <span className="ht-chip">Sundays 9:00 AM</span>
            </div>

            <div className="ht-card lg">
              <div className="ht-card-head">
                <div className="ht-icon-ring">🎵</div>
                <h4 className="ht-card-title">Choir Ministry</h4>
              </div>
              <p className="ht-card-text">
                Traditional Ethiopian Orthodox liturgical music and modern spiritual songs in worship.
              </p>
              <span className="ht-chip">Saturdays 6:00 PM</span>
            </div>

            <div className="ht-card lg">
              <div className="ht-card-head">
                <div className="ht-icon-ring">🤝</div>
                <h4 className="ht-card-title">Community Outreach</h4>
              </div>
              <p className="ht-card-text">
                Serving our local Nashville community through charitable works and social programs.
              </p>
              <span className="ht-chip">Monthly events</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA GRADIENT */}
      <section className="ht-cta ht-cta-gradient">
        <div className="ht-container ht-cta-inner">
          <h3>Get Involved</h3>
          <p>
            Whether you're new to our church or have been part of our family for years,
            there's a place for you to serve and grow in our ministries.
          </p>
          <a className="ht-btn ht-btn-gold" href="#ministries">Join a Ministry</a>
        </div>
      </section>

      {/* SERVE WITH PURPOSE */}
      <section id="serve" className="ht-section">
        <div className="ht-container">
          <h3 className="ht-h3">Serving with Purpose</h3>
          <p className="ht-lead">
            By serving the church, you are directly participating in the work the Lord has given to Holy Trinity
            Ethiopian Orthodox Tewahedo Church through our mission and vision.
          </p>

          <div className="ht-grid ht-grid-3">
            <div className="ht-card center">
              <div className="ht-icon-slate">❤</div>
              <h4 className="ht-card-title">Make a Difference</h4>
              <p className="ht-card-text">
                Your service impacts lives and strengthens our community of faith.
              </p>
            </div>
            <div className="ht-card center">
              <div className="ht-icon-slate">👥</div>
              <h4 className="ht-card-title">Build Community</h4>
              <p className="ht-card-text">
                Connect with fellow believers and grow together in service and fellowship.
              </p>
            </div>
            <div className="ht-card center">
              <div className="ht-icon-slate">🤍</div>
              <h4 className="ht-card-title">Use Your Gifts</h4>
              <p className="ht-card-text">
                Discover and utilize your God-given talents in meaningful ministry.
              </p>
            </div>
          </div>

          <div className="ht-center">
            <a className="ht-btn ht-btn-dark" href="#serve-now">Serve Our Church</a>
          </div>
        </div>
      </section>

      {/* FEATURED CLERGY STRIP (dark) */}
      <section className="ht-strip">
        <div className="ht-container">
          <h3 className="ht-strip-title">Featured Clergy</h3>
          <div className="ht-grid ht-grid-3">
            {["/assets/images/feature1.jpg","/assets/images/feature2.jpg","/assets/images/feature3.jpg"].map((src, i) => (
              <a key={i} href="#" className="ht-strip-card">
                <div className="ht-strip-img" style={{ backgroundImage: `url(${src})` }} />
                <div className="ht-strip-meta">
                  <p className="ht-strip-kicker">Father</p>
                  <h4 className="ht-strip-name">Clergy Name</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
