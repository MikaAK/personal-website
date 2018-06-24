import {map as rxMap} from 'rxjs/operators'

export const rxMapProp = <T>(prop: keyof T) => rxMap((item: T) => item[prop])
