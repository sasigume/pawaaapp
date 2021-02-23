import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCube, faBook } from '@fortawesome/free-solid-svg-icons'

export default function addIcon() {
  library.add(faGithub, faTwitter, faUser, faCube, faBook)
}