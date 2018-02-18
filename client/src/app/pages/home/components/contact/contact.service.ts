import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import * as AWS from 'aws-sdk'

export const COGNITO_POOL_ID = 'us-west-2:72c055c5-e4ba-4ae1-9223-e1a616eb1a18'
export const LAMBDA_VERSION = '2015-03-31'
export const LAMBDA_REGION = 'us-west-2'
export const PULL_PARAMS = {
  FunctionName: 'personal-email',
  InvocationType: 'RequestResponse',
  LogType: 'None'
}

export interface SendEmailParams {
  senderEmail: string
  senderName: string
  message: string
}

AWS.config.region = LAMBDA_REGION
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: COGNITO_POOL_ID})

@Injectable()
export class ContactService {
  private lambda = new AWS.Lambda({
    apiVersion: LAMBDA_VERSION,
    region: LAMBDA_REGION
  })

  constructor() {  }

  public sendEmail(sendParams: SendEmailParams) {
    return this.lambdaFunctionToObservable(sendParams)
  }

  private makeLambdaParams(params: SendEmailParams) {
    return {
      ...PULL_PARAMS,
      Payload: JSON.stringify(params)
    }
  }

  private lambdaFunctionToObservable(params: SendEmailParams) {
    return new Observable((observer) => {
      this.lambda.invoke(this.makeLambdaParams(params), (error, data) => {
        if (error) {
          observer.error(error)
        } else {
          observer.next(JSON.parse((<any>data).Payload))
          observer.complete()
        }
      })
    })
  }
}
