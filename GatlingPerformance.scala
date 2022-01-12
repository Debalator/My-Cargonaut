package mycargonaut

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._

class BasicSimulation extends Simulation {

  val sessionHeaders = Map(
    "Authorization" -> "Bearer #{authToken}",
    "Content-Type" -> "application/json"
  )

  val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .acceptHeader("application/json")
    .doNotTrackHeader("1")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0")

  def login() =
    exec(
      http("login")
        .post("/api/auth/login")
        .header("Content-Type", "application/json")
        .body(StringBody("""{ "username": "lars", "password": "lars" }"""))
        .asJson
        .check(jsonPath("$..access_token").ofType[String].exists.saveAs("authToken"))
        .check(jsonPath("$..id").ofType[String].exists.saveAs("userID"))
    )

  def getUser() =
    exec(
      http("getUser")
        .get("/api/users/#{userID}")
        .headers(sessionHeaders)
    )

  def createVehicle() =
    exec(
      http("createVehicle")
        .post("/api/vehicles")
        .headers(sessionHeaders)
        .body(StringBody("""{"brand": "VW", "model": "Passat", "seats": "3", "loadingArea": "5" }"""))
        .asJson
        .check(jsonPath("$..id").ofType[String].exists.saveAs("vehicleID"))
    )

  def deleteVehicle() =
    exec(
      http("deleteVehicle")
        .delete("/api/vehicles/#{vehicleID}")
        .headers(sessionHeaders)
    )

  val scn = scenario("BasicSimulation")
    .exec(login())
    .exec(getUser())
    .exec(createVehicle())
    .exec(deleteVehicle())

  setUp(
    scn.inject(rampUsers(500).during(5.seconds)), // Injects a given number of users distributed evenly on a time window of a given duration.
  ).protocols(httpProtocol)
}