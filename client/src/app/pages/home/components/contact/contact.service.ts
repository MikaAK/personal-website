import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {map as rxMap, switchMap} from 'rxjs/operators'
import {fromPromise} from 'rxjs/observable/fromPromise'
import {Lambda} from 'aws-sdk'

export const COGNITO_POOL_ID = 'us-west-2:72c055c5-e4ba-4ae1-9223-e1a616eb1a18'
export const LAMBDA_VERSION = '2015-03-31'
export const LAMBDA_REGION = 'us-west-2'
export const PULL_PARAMS = {
  FunctionName: 'personal-email',
  InvocationType: 'RequestResponse',
  LogType: 'None'
}

export type SendEmailParams = {
  senderEmail: string
  senderName: string
  message: string
}

@Injectable()
export class ContactService {
  public sendEmail(sendParams: SendEmailParams) {
    return this.connectToLambda()
      .pipe(switchMap((lambda) => this.lambdaFunctionToObservable(lambda, sendParams)))
  }

  private makeLambdaParams(params: SendEmailParams) {
    return {
      ...PULL_PARAMS,
      Payload: JSON.stringify(params)
    }
  }

  private lambdaFunctionToObservable(lambda: Lambda, params: SendEmailParams) {
    return new Observable((observer) => {
      lambda.invoke(this.makeLambdaParams(params), (error, data) => {
        if (error) {
          observer.error(error)
        } else {
          observer.next(JSON.parse((<any>data).Payload))
          observer.complete()
        }
      })
    })
  }

  private connectToLambda() {
    return fromPromise(import('aws-sdk'))
      .pipe(
        rxMap(({config, Lambda: lambdaClient, CognitoIdentityCredentials}) => {
          config.region = LAMBDA_REGION
          config.credentials = new CognitoIdentityCredentials({IdentityPoolId: COGNITO_POOL_ID})

          return new lambdaClient({
            apiVersion: LAMBDA_VERSION,
            region: LAMBDA_REGION
          })
        })
      )
  }
}
