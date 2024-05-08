import LoginBackground from "./login-background.jpg";
import LogoTransparent from "./logo_transparent.png";
import UserBanner from "./user-banner.jpg";
import BronzeBadge from "./bronze-badge.png";
import SilverBadge from "./silver-badge.png";
import GoldBadge from "./gold-badge.png";
import PlatinumBadge from "./platinum-badge.png";
import Batman from "./batman.png";
import Shipping from "./shipping.png";
import Artist from "./artist.png";
import Rapper from "./rapper.png";
import Joker from "./joker.png";
import BlackNinja from "./black-ninja.png";
import StormTrooper from "./storm-tropper.png";
import Cars from "./cars.png";
import IronMan from "./ironman.png";
import Detective from "./detective.png";
import Deadpool from "./deadpool.png";
import UnknownMinifig from "./unknown_minifig.jpg";
import UnknownPiece from "./unknown_piece.jpg";
import Comedian from "./comedian.png";
import ShoppingArt from "./shopping_art.png";
import Santa from "./santa_gift.png";
import Announcement from "./announcement.png";
import Robin from "./robin.png";
import Waiter from "./waiter.png";

import Loading from "./loading.gif";

import ArchitectureTheme from "./themes/Architecture.webp";
import BrickMoreTheme from "./themes/bricksandmore.webp";
import CityTheme from "./themes/City.webp";
import ClassicTheme from "./themes/Classic.webp";
import CreatorTheme from "./themes/Creator.webp";
import CreatorExpertTheme from "./themes/Creator Expert.webp";
import DisneyTheme from "./themes/Disney.webp";
import DuploTheme from "./themes/Duplo.webp";
import EducationTheme from "./themes/Education.webp";
import FriendsTheme from "./themes/Friends.webp";
import GabbysTheme from "./themes/gabbys_dollhouse.webp";
import GamesTheme from "./themes/games.webp";
import HarryPotterTheme from "./themes/Harry Potter.webp";
import HeroFactoryTheme from "./themes/hero_factory.webp";
import IconsTheme from "./themes/icons.webp";
import JuniorsTheme from "./themes/juniors.webp";
import JurassicTheme from "./themes/Jurassic World.webp";
import LordOfTheRingTheme from "./themes/lord-ot-rings.webp";
import MarvelTheme from "./themes/Marvel Super Heroes.webp";
import MinecraftTheme from "./themes/Minecraft.webp";
import MiscellaneousTheme from "./themes/Miscellaneous.webp";
import NinjagoTheme from "./themes/Ninjago.webp";
import SeasonalTheme from "./themes/seasonal.webp";
import SpaceTheme from "./themes/Space.webp";
import SpongeTheme from "./themes/sponge.webp";
import StarWarsTheme from "./themes/Star Wars.webp";
import TechnicTheme from "./themes/Technic.webp";
import IdeasTheme from "./themes/Ideas.webp";
import MonkieTheme from "./themes/Monkie Kid.webp";
import SpeedTheme from "./themes/Speed Champions.webp";

import Banner1 from "./banner1.png";
import Banner2 from "./banner2.webp";
import Banner3 from "./banner3.webp";
import Banner4 from "./banner4.webp";

interface CategoryMap {
  [key: string]: string;
}

export {
  LoginBackground,
  LogoTransparent,
  UserBanner,
  BronzeBadge,
  SilverBadge,
  GoldBadge,
  PlatinumBadge,
  Batman,
  Shipping,
  Artist,
  Rapper,
  Joker,
  BlackNinja,
  StormTrooper,
  Cars,
  IronMan,
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Loading,
  Detective,
  Deadpool,
  UnknownMinifig,
  UnknownPiece,
  Comedian,
  ShoppingArt,
  Santa,
  Announcement,
  Robin,
  Waiter,
};

export const themes: CategoryMap = {
  Architecture: ArchitectureTheme,
  Minecraft: MinecraftTheme,
  City: CityTheme,
  Ninjago: NinjagoTheme,
  "Harry Potter": HarryPotterTheme,
  "Star Wars": StarWarsTheme,
  "Bricks and More": BrickMoreTheme,
  Classic: ClassicTheme,
  Creator: CreatorTheme,
  "Creator Expert": CreatorExpertTheme,
  Disney: DisneyTheme,
  Duplo: DuploTheme,
  Education: EducationTheme,
  Friends: FriendsTheme,
  "Gabby's Dollhouse": GabbysTheme,
  Games: GamesTheme,
  "HERO Factory": HeroFactoryTheme,
  Icons: IconsTheme,
  Juniors: JuniorsTheme,
  "Jurassic World": JurassicTheme,
  "Marvel Super Heroes": MarvelTheme,
  Miscellaneous: MiscellaneousTheme,
  Seasonal: SeasonalTheme,
  Space: SpaceTheme,
  "SpongeBob SquarePants": SpongeTheme,
  "The Lord of the Rings": LordOfTheRingTheme,
  Ideas: IdeasTheme,
  "Monkie Kid": MonkieTheme,
  "Speed Champions": SpeedTheme,
  Technic: TechnicTheme,
};

export const sixFirstThemes = Object.entries(themes)
  .slice(0, 6)
  .map(([key, value]) => ({
    name: key,
    img: value,
  }));
