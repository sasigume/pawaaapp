import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter, faPlaystation, faXbox, faJava } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCube, faBook, faThumbsUp, faBars, faMoon, faSun, faQuestion, faDiceTwo } from '@fortawesome/free-solid-svg-icons'
// faDiceTwo for Nintendo Switch
export default function addIcon() {
  library.add(faGithub, faTwitter, faUser, faCube, faBook, faThumbsUp, faBars, faMoon, faSun, faQuestion, faPlaystation, faXbox, faJava, faDiceTwo)
}