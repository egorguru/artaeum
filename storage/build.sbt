name := "storage"

version := "1.0"

scalaVersion := "2.12.7"

resolvers += Resolver.bintrayRepo("albinusco", "maven")

libraryDependencies ++= Seq(
  "com.tumblr" %% "colossus" % "0.11.1-RC1",
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-core" % "0.48.2" % Compile, 
  "com.github.plokhotnyuk.jsoniter-scala" %% "jsoniter-scala-macros" % "0.48.2" % Provided,
  "com.tumblr" %% "colossus-testkit" % "0.11.1-RC1" % Test,
  "me.albinus" %% "eureka-client" % "1.0.1"
)

assemblyJarName in assembly := "storage.jar"

assemblyMergeStrategy in assembly := {
  case PathList("org", "xmlpull", xs@_*) => MergeStrategy.first
  case PathList("javax", "xml", xs@_*) => MergeStrategy.first
  case PathList("com", "fasterxml", xs@_*) => MergeStrategy.first
  case PathList("com", "ctc", xs@_*) => MergeStrategy.first
  case x => (assemblyMergeStrategy in assembly).value(x)
}
