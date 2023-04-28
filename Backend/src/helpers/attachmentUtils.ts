import * as AWS from 'aws-sdk'
import * as AWSXRAY from 'aws-xray-sdk'
import { Types } from 'aws-sdk/clients/s3'

const XAWS = AWSXRAY.captureAWS(AWS)

// TODO: Implement the fileStogare logic
export class AttachmentUtils {

    constructor (
        private readonly s3Client: Types = new XAWS.S3({ signatureVersion: 'v4' }),
     
        private readonly s3_BucketName = process.env.ATTACHMENT_S3_BUCKET
      ) {}

async generateUploadUrl (postId: string): Promise<string> {
    console.log('Generating URL')

    const url = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.s3_BucketName,
      Key: postId,
      Expires: 3000
    })
    console.log(url)

    return url as string
  }
}