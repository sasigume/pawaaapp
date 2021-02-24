import {Creator} from './Creator'
import {Subject} from './Subject'
import {Sys} from './Sys'

export interface Post {
  sys :Sys
  displayName:string
  slug:string
  md:string
  intro:string
  image: {
    url:string
  }
  subjectsCollection: {
    items: Subject[]
  } 
  creatorsCollection: {
    items: Creator[]
  }
}