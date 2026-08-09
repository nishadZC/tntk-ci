FROM --platform=amd64 golang:1.17 as build
WORKDIR /workbench
COPY . .
RUN go mod tidy
RUN apt update && apt install -y unzip
RUN GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/lambda/output/lambda ./lambda/main.go
RUN curl -LO https://github.com/SebastiaanKlippert/go-wkhtmltopdf-lambda/releases/download/0.1/lambda.zip && unzip lambda.zip -d bin/lambda/output && rm -f lambda.zip
RUN chmod +x bin/lambda/output/lambda bin/lambda/output/wkhtmltopdf

FROM public.ecr.aws/lambda/go:1 as runtime
COPY --from=build /workbench/bin ${LAMBDA_TASK_ROOT}/bin

# Add wkhtmltopdf to PATH and set FONTCONFIG_PATH
ENV PATH="${LAMBDA_TASK_ROOT}/bin/lambda/output:${PATH}"
ENV FONTCONFIG_PATH="${LAMBDA_TASK_ROOT}/bin/lambda/output/fonts"

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "bin/lambda/output/lambda" ]