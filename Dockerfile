# Stage - Build
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ./*.sln  ./

# Copy the main source project files
COPY src/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p src/${file%.*}/ && mv $file src/${file%.*}/; done

# Copy the test project files
COPY test/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p test/${file%.*}/ && mv $file test/${file%.*}/; done

RUN dotnet restore

# copy and build everything else
COPY src/. ./src/
COPY test/. ./test/

RUN dotnet build

# Stage - publish
FROM build AS publish
WORKDIR /source
RUN dotnet publish --output /app/ --configuration Release --no-restore ./src/EventHorizon.Game.Server.Player/EventHorizon.Game.Server.Player.csproj

# Stage - runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
ARG BUILD_VERSION=0.0.0
ENV APPLICATION_VERSION=$BUILD_VERSION

WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "EventHorizon.Game.Server.Player.dll"]