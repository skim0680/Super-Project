import NewsCarousel from '../components/NewsCarousel'

export default function Home() {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Protect Earth's Endangered Species</h1>
                <p>Learn about endangered wildlife and join our mission to protect them</p>
            </section>

            <section className="news-section">
                <h2>Latest Wildlife News</h2>
                <NewsCarousel />
            </section>

            <section className="cta-section">
                <div className="cta-card">
                    <h3>Start Your Journey</h3>
                    <p>Play, learn, and collect information about endangered species</p>
                    <a href="/play" className="cta-button">Play Now</a>
                </div>
                <div className="cta-card">
                    <h3>View Your Collection</h3>
                    <p>Track your progress and review what you've learned</p>
                    <a href="/collection" className="cta-button">View Collection</a>
                </div>
            </section>
        </div>
    )
}