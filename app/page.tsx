import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import WeatherModule from "@/components/weather-module"
import SafetyNewsModule from "@/components/safety-news-module"
import CulinaryCompass from "@/components/culinary-compass"
import VisualVibe from "@/components/visual-vibe"
import TopPlaces from "@/components/top-places"
import AITravelPlan from "@/components/ai-travel-plan"
import TravelAgentService from "@/components/travel-agent-service"
import BestRouteDirection from "@/components/best-route-direction"
import TransportAvailability from "@/components/transport-availability"
import TransportComparison from "@/components/transport-comparison"
import HotelFinder from "@/components/hotel-finder"
import EmergencyServices from "@/components/emergency-services"
import SmartChecklist from "@/components/smart-checklist"
import HiddenGems from "@/components/hidden-gems"
import TravelStoryGenerator from "@/components/travel-story-generator"
import GroupTripPlanner from "@/components/group-trip-planner"
import SmartRouteSwitcher from "@/components/smart-route-switcher"
import WeatherSuggestions from "@/components/weather-suggestions"
import OfflineMode from "@/components/offline-mode"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import SideNav from "@/components/side-nav"
import AIChatAssistant from "@/components/ai-chat-assistant"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <SideNav />
      <AIChatAssistant />
      <Navbar />
      <section id="home"><HeroSection /></section>
      <section id="weather"><WeatherModule /></section>
      <section id="safety" data-news-anchor><SafetyNewsModule /></section>
      <section id="top-places"><TopPlaces /></section>
      <VisualVibe />
      <CulinaryCompass />
      <section id="premium"><AITravelPlan /></section>
      <TravelAgentService />
      <BestRouteDirection />
      <section id="transport"><TransportAvailability /></section>
      <TransportComparison />
      <section id="hotels"><HotelFinder /></section>
      <EmergencyServices />
      <SmartChecklist />
      <SmartRouteSwitcher />
      <WeatherSuggestions />
      <HiddenGems />
      <OfflineMode />
      <TravelStoryGenerator />
      <section id="group"><GroupTripPlanner /></section>
      <Footer />
    </main>
  )
}
