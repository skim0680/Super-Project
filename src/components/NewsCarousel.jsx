import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function NewsCarousel() {
    const [articles, setArticles] = useState([
        {
            title: "Endangered Species Recovery Brings Hope",
            image: "/news/recovery.jpg",
            description: "Recent conservation efforts show promising results for endangered species.",
            link: "#"
        },
        {
            title: "Climate Change Impact on Wildlife",
            image: "/news/climate.jpg",
            description: "How changing climate patterns affect endangered species populations.",
            link: "#"
        },
        {
            title: "Community Conservation Success",
            image: "/news/community.jpg",
            description: "Local communities make significant impact in wildlife preservation.",
            link: "#"
        }
    ])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    }

    return (
        <div className="news-carousel">
            <Slider {...settings}>
                {articles.map((article, index) => (
                    <div key={index} className="carousel-slide">
                        <div className="slide-content">
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <a href={article.link} className="read-more">Read More →</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}