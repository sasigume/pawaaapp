import {Sys} from './Sys'

export interface Creator {
  sys: Sys
  displayName:string
  slug:string
  picture: {
    url:string
  }
}