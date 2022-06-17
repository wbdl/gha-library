# driftctl arguments Action for GitHub Actions

This Github action will generate arguments for the `snyk/driftctl-action@v1` action

**Table of Contents**

<!-- toc -->

- [Inputs](#inputs)
- [Usage](#usage)

<!-- tocstop -->

## Inputs

## `arguments`

Additional arguments to pass to driftctl

## `aws-region`

The AWS region of the S3 bucket. Default `"us-east-1"`.

## `path-filter`

The to filter objects by.

## `state-bucket`

**Required** The S3 bucket containing state files

## Usage

```yaml
      - name: driftctl args
        id: driftctl-args
        uses: ./.github/actions/driftctl-args
        with:
          arguments: '--only-unmanaged --tf-provider-version 4.12.1'
          state-bucket: ${{ matrix.accounts.state_bucket }}
          path-filter: plato-glass-cloud

      - name: Run driftctl
        uses: snyk/driftctl-action@v1
        with:
          args: ${{ steps.driftctl-args.outputs.args }}
```

## Credentials

This action relies on the [default behavior of the AWS SDK for Javascript](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) to determine AWS credentials and region.
Use [the `aws-actions/configure-aws-credentials` action](https://github.com/aws-actions/configure-aws-credentials) to configure the GitHub Actions environment with environment variables containing AWS credentials and your desired region.