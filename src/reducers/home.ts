import {
    GETPERSON
} from '../constants/home';

import { homeType } from '../constants/homeType'

const INITIAL_STATE: homeType = {
    person:{
        items:[]
    }
}


export default function home (state = INITIAL_STATE, action) {
    switch (action.type){

        case GETPERSON:
           const {person} = action.payload 
            return{
                ...state,
                person
            }
    }
}