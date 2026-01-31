import { Github, Linkedin, Globe, MapPin, Users, Award, BookOpen, Briefcase, Users2 } from "lucide-react";
import { authors, projectLinks } from "@/data/authorsData";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
            Quem Somos
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Conheça os desenvolvedores por trás do AI Stock Dashboard
          </p>

          {/* Project Links */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={projectLinks.frontend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Github className="w-4 h-4" />
              Frontend Repository
            </a>
            <a
              href={projectLinks.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <Github className="w-4 h-4" />
              Backend Repository
            </a>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {authors.map((author) => (
            <Card
              key={author.nome}
              className="p-6 dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Author Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                  {author.nome}
                </h2>
                {author.titulo && (
                  <p className="text-lg text-primary font-medium mb-3">
                    {author.titulo}
                  </p>
                )}

                {/* Location and Connections */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{author.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{author.conexoes} conexões</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mb-4">
                  {author.github && (
                    <a
                      href={author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                </div>
              </div>

              <Separator className="mb-6 dark:bg-slate-800" />

              {/* Skills */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                  <Award className="w-4 h-4" />
                  Competências
                </h3>
                <div className="flex flex-wrap gap-2">
                  {author.competencias.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {author.experiencia.length > 0 && (
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                    <Briefcase className="w-4 h-4" />
                    Experiência
                  </h3>
                  <div className="space-y-4">
                    {author.experiencia.map((exp, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium dark:text-white">
                          {exp.cargo}
                        </p>
                        <p className="text-muted-foreground">
                          {exp.empresa} • {exp.periodo}
                        </p>
                        {exp.descricao && (
                          <p className="text-muted-foreground text-xs mt-1">
                            {exp.descricao}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {author.educacao.length > 0 && (
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                    <BookOpen className="w-4 h-4" />
                    Educação
                  </h3>
                  <div className="space-y-3">
                    {author.educacao.map((edu, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium dark:text-white">
                          {edu.curso}
                        </p>
                        <p className="text-muted-foreground">
                          {edu.instituicao}
                        </p>
                        {edu.periodo && (
                          <p className="text-muted-foreground text-xs">
                            {edu.periodo}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {author.certificacoes.length > 0 && (
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                    <Award className="w-4 h-4" />
                    Certificações
                  </h3>
                  <div className="space-y-2">
                    {author.certificacoes.map((cert, idx) => (
                      <div key={idx} className="text-sm">
                        {cert.credencial ? (
                          <a
                            href={cert.credencial}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            {cert.titulo}
                          </a>
                        ) : (
                          <p className="font-medium dark:text-white">
                            {cert.titulo}
                          </p>
                        )}
                        <p className="text-muted-foreground">
                          {cert.instituicao} • {cert.emitido_em}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Volunteering */}
              {author.voluntariado.length > 0 && (
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                    <Users2 className="w-4 h-4" />
                    Voluntariado
                  </h3>
                  <div className="space-y-3">
                    {author.voluntariado.map((vol, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium dark:text-white">
                          {vol.cargo}
                        </p>
                        <p className="text-muted-foreground">
                          {vol.organizacao} • {vol.periodo}
                        </p>
                        {vol.descricao && (
                          <p className="text-muted-foreground text-xs mt-1">
                            {vol.descricao}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {Object.keys(author.idiomas || {}).length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
                    <Globe className="w-4 h-4" />
                    Idiomas
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(author.idiomas || {}).map(
                      ([lang, level]) => (
                        <div key={lang} className="flex justify-between text-sm">
                          <span className="capitalize dark:text-white">
                            {lang}
                          </span>
                          <span className="text-muted-foreground">
                            {level}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* About Project Section */}
        <Card className="p-8 dark:bg-slate-900 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Sobre o Projeto
          </h2>
          <p className="text-muted-foreground mb-4">
            O AI Stock Dashboard é um projeto colaborativo entre dois
            desenvolvedores talentosos:
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              <strong className="dark:text-white">Igor Mateus de Lima Nunes</strong> - Responsável pelo desenvolvimento
              completo da interface frontend, design e experiência do usuário.
            </li>
            <li>
              <strong className="dark:text-white">Guilherme Klein Klug</strong> - Responsável pelo desenvolvimento
              completo da API backend e infraestrutura.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
