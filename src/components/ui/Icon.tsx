import React from 'react'
import {
  ArrowRight,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  Tv,
  Sparkles,
  Search,
  Star,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  ListVideo,
  Users,
  Eye,
  Loader2,
  Lock,
  MessageSquare,
  Mail,
  Globe,
  AtSign,
  Send,
  ChevronDown,
  X,
  Menu,
  Instagram,
  Youtube,
  Share2,
  CheckCircle2,
  Link2,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'

export type IconName =
  | 'arrow_forward'
  | 'auto_stories'
  | 'shopping_bag'
  | 'shopping_cart'
  | 'smart_display'
  | 'menu_book'
  | 'auto_awesome'
  | 'search'
  | 'star'
  | 'stars'
  | 'play_arrow'
  | 'pause'
  | 'volume_up'
  | 'settings'
  | 'fullscreen'
  | 'playlist_play'
  | 'group'
  | 'visibility'
  | 'progress_activity'
  | 'lock_open'
  | 'chat_bubble_outline'
  | 'mail'
  | 'public'
  | 'alternate_email'
  | 'east'
  | 'send'
  | 'keyboard_arrow_down'
  | 'close'
  | 'menu'
  | 'share'
  | 'check_circle'
  | string

const iconMap: Record<string, LucideIcon> = {
  arrow_forward: ArrowRight,
  east: ArrowRight,
  auto_stories: BookOpen,
  menu_book: BookOpen,
  shopping_bag: ShoppingBag,
  shopping_cart: ShoppingCart,
  smart_display: Tv,
  auto_awesome: Sparkles,
  search: Search,
  star: Star,
  stars: Star,
  play_arrow: Play,
  pause: Pause,
  volume_up: Volume2,
  settings: Settings,
  fullscreen: Maximize,
  playlist_play: ListVideo,
  group: Users,
  visibility: Eye,
  progress_activity: Loader2,
  lock_open: Lock,
  chat_bubble_outline: MessageSquare,
  mail: Mail,
  public: Globe,
  alternate_email: AtSign,
  send: Send,
  keyboard_arrow_down: ChevronDown,
  close: X,
  menu: Menu,
  share: Share2,
  check_circle: CheckCircle2,
  link: Link2,
  external_link: ExternalLink,
  youtube: Youtube,
  instagram: Instagram,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
  className?: string
  size?: number | string
}

export function Icon({ name, className = '', size = 20, ...props }: IconProps) {
  const IconComponent = iconMap[name.toLowerCase()] || Sparkles

  return (
    <IconComponent
      size={size}
      className={className}
      aria-hidden="true"
      {...props}
    />
  )
}

export default Icon
