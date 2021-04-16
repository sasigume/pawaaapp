import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faTwitter,
  faPlaystation,
  faXbox,
  faJava,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faCube,
  faBook,
  faBars,
  faMoon,
  faSun,
  faQuestion,
  faDiceTwo,
  faCommentAlt,
  faChevronDown,
  faChevronUp,
  faHeart,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
// faDiceTwo for Nintendo Switch
export default function addIcon() {
  library.add(
    faGithub,
    faTwitter,
    faUser,
    faCube,
    faBook,
    faBars,
    faMoon,
    faSun,
    faQuestion,
    faPlaystation,
    faXbox,
    faJava,
    faDiceTwo,
    faCommentAlt,
    faChevronDown,
    faChevronUp,
    faHeart,
    faThumbsUp,
    faThumbsDown,
  );
}
